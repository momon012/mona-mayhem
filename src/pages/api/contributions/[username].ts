import type { APIRoute } from 'astro';
import { isValidGitHubUsername } from '../../../lib/battle.mjs';

export const prerender = false;

const CACHE_CONTROL = 'public, max-age=300';

type ContributionLevel = 0 | 1 | 2 | 3 | 4;

interface UpstreamContributionDay {
	weekday: number;
	count: number;
	level: number;
}

interface UpstreamContributionWeek {
	first_day: string;
	contribution_days: UpstreamContributionDay[];
}

interface UpstreamContributionCalendar {
	weeks: UpstreamContributionWeek[];
}

interface ContributionDay {
	date: string;
	contributionCount: number;
	contributionLevel: ContributionLevel;
}

interface ContributionWeek {
	firstDay: string;
	days: ContributionDay[];
}

interface ContributionResponse {
	username: string;
	weeks: ContributionWeek[];
	days: ContributionDay[];
}

function jsonResponse(body: unknown, status: number): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			'Cache-Control': CACHE_CONTROL,
			'Content-Type': 'application/json',
		},
	});
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function isUpstreamCalendar(value: unknown): value is UpstreamContributionCalendar {
	if (!isRecord(value) || !Array.isArray(value.weeks)) {
		return false;
	}

	return value.weeks.every((week) => {
		if (!isRecord(week) || typeof week.first_day !== 'string' || !Array.isArray(week.contribution_days)) {
			return false;
		}

		return week.contribution_days.every((day) => {
			return (
				isRecord(day) &&
				Number.isInteger(day.weekday) &&
				day.weekday >= 0 &&
				day.weekday <= 6 &&
				Number.isInteger(day.count) &&
				day.count >= 0 &&
				Number.isInteger(day.level) &&
				day.level >= 0 &&
				day.level <= 4
			);
		});
	});
}

function addDays(date: string, days: number): string {
	const parsed = new Date(`${date}T00:00:00.000Z`);

	if (Number.isNaN(parsed.getTime())) {
		throw new Error('Invalid upstream date');
	}

	parsed.setUTCDate(parsed.getUTCDate() + days);
	return parsed.toISOString().slice(0, 10);
}

function normalizeCalendar(username: string, calendar: UpstreamContributionCalendar): ContributionResponse {
	const weeks = calendar.weeks.slice(-52).map((week) => {
		const days = week.contribution_days.map((day) => ({
			date: addDays(week.first_day, day.weekday),
			contributionCount: day.count,
			contributionLevel: day.level as ContributionLevel,
		}));

		return {
			firstDay: week.first_day,
			days,
		};
	});

	return {
		username,
		weeks,
		days: weeks.flatMap((week) => week.days),
	};
}

// Endpoint: https://github.com/{username}.contribs
export const GET: APIRoute = async ({ params }) => {
	const username = params.username;

	if (!isValidGitHubUsername(username)) {
		return jsonResponse({ error: 'Invalid GitHub username' }, 400);
	}

	try {
		const upstreamResponse = await fetch(`https://github.com/${username}.contribs`, {
			headers: {
				Accept: 'application/json',
				'User-Agent': 'mona-mayhem',
			},
		});

		if (upstreamResponse.status === 404) {
			return jsonResponse({ error: 'GitHub user not found' }, 404);
		}

		if (!upstreamResponse.ok) {
			return jsonResponse({ error: 'GitHub contribution service failed' }, 502);
		}

		const payload: unknown = await upstreamResponse.json();

		if (!isUpstreamCalendar(payload)) {
			return jsonResponse({ error: 'Invalid contribution data from GitHub' }, 502);
		}

		return jsonResponse(normalizeCalendar(username, payload), 200);
	} catch {
		return jsonResponse({ error: 'Unable to fetch GitHub contribution data' }, 500);
	}
};
