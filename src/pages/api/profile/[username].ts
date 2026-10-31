import type { APIRoute } from 'astro';
import { isValidGitHubUsername } from '../../../lib/battle.mjs';

export const prerender = false;

const jsonResponse = (body: unknown, status: number) => new Response(JSON.stringify(body), {
	status,
	headers: {
		'Cache-Control': 'public, max-age=300',
		'Content-Type': 'application/json',
	},
});

export const GET: APIRoute = async ({ params }) => {
	const username = params.username;

	if (!isValidGitHubUsername(username)) {
		return jsonResponse({ error: 'Invalid GitHub username' }, 400);
	}

	try {
		const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
			headers: {
				Accept: 'application/vnd.github+json',
				'User-Agent': 'mona-mayhem',
			},
		});

		if (response.status === 404) {
			return jsonResponse({ error: 'GitHub user not found' }, 404);
		}

		if (!response.ok) {
			return jsonResponse({ error: 'GitHub profile service failed' }, 502);
		}

		const profile = await response.json();
		return jsonResponse({
			login: profile.login,
			name: profile.name,
			avatarUrl: profile.avatar_url,
			htmlUrl: profile.html_url,
			bio: profile.bio,
			repositories: profile.public_repos,
			followers: profile.followers,
			following: profile.following,
		}, 200);
	} catch {
		return jsonResponse({ error: 'Unable to fetch GitHub profile' }, 500);
	}
};
