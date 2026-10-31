import assert from 'node:assert/strict';
import test from 'node:test';
import {
	calculateStats,
	isValidGitHubUsername,
	parseContributionData,
	scoreBattle,
} from '../src/lib/battle.mjs';

const makeDays = (counts) => counts.map((count, index) => ({
	date: new Date(Date.UTC(2024, 0, 1 + index)).toISOString().slice(0, 10),
	contributionCount: count,
	contributionLevel: count === 0 ? 0 : Math.min(4, count),
}));

const makePayload = (days) => ({
	username: 'test-user',
	weeks: Array.from({ length: 52 }, (_, index) => ({
		firstDay: `2024-01-${String((index % 28) + 1).padStart(2, '0')}`,
		days: days.slice(index * 7, index * 7 + 7),
	})),
	days,
});

test('parses a zero-contribution year', () => {
	const days = makeDays(Array(364).fill(0));
	const parsed = parseContributionData(makePayload(days), 'zero-user');
	const stats = calculateStats(parsed.days);

	assert.equal(parsed.days.length, 364);
	assert.deepEqual(stats, {
		total: 0,
		longestStreak: 0,
		currentStreak: 0,
		peakCount: 0,
		peakDate: days[0].date,
		consistency: 0,
	});
});

test('calculates longest streak across month and year boundaries', () => {
	const days = makeDays(Array(364).fill(0));
	for (let index = 364 - 3; index <= 364 - 1; index += 1) days[index].contributionCount = 1;
	days[0].date = '2023-12-30';
	days[1].date = '2023-12-31';
	days[2].date = '2024-01-01';
	days[0].contributionCount = 1;
	days[1].contributionCount = 1;
	days[2].contributionCount = 1;
	const stats = calculateStats(days);

	assert.equal(stats.longestStreak, 3);
	assert.equal(stats.currentStreak, 3);
});

test('awards half points when all battle stats are identical', () => {
	const stats = calculateStats(makeDays(Array(364).fill(2)));
	const result = scoreBattle(stats, stats);

	assert.equal(result.firstScore, 2.5);
	assert.equal(result.secondScore, 2.5);
	assert.deepEqual(result.winners, [0, 0, 0, 0, 0]);
});

test('accepts valid GitHub usernames and rejects invalid route values', () => {
	for (const username of ['octocat', 'user-name', 'A123']) {
		assert.equal(isValidGitHubUsername(username), true);
	}

	for (const username of ['', '-leading', 'trailing-', 'bad_user', 'a'.repeat(40), '../admin']) {
		assert.equal(isValidGitHubUsername(username), false);
	}
});
