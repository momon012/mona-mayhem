export const isValidGitHubUsername = (username) => (
	typeof username === 'string' &&
	/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username)
);

export const parseContributionData = (payload, username) => {
	if (!payload || typeof payload !== 'object' || !Array.isArray(payload.weeks) || !Array.isArray(payload.days)) {
		throw new Error(`Contribution data for ${username} is malformed.`);
	}

	const weeks = payload.weeks.map((week) => {
		if (!week || typeof week !== 'object' || typeof week.firstDay !== 'string' || !Array.isArray(week.days)) {
			throw new Error(`Contribution weeks for ${username} are malformed.`);
		}

		return {
			firstDay: week.firstDay,
			days: week.days.map((day) => {
				if (
					!day ||
					typeof day.date !== 'string' ||
					!Number.isInteger(day.contributionCount) ||
					day.contributionCount < 0 ||
					!Number.isInteger(day.contributionLevel) ||
					day.contributionLevel < 0 ||
					day.contributionLevel > 4
				) {
					throw new Error(`Contribution day data for ${username} is malformed.`);
				}

				return {
					date: day.date,
					contributionCount: day.contributionCount,
					contributionLevel: day.contributionLevel,
				};
			}),
		};
	});

	const days = payload.days.map((day) => {
		if (
			!day ||
			typeof day.date !== 'string' ||
			!Number.isInteger(day.contributionCount) ||
			day.contributionCount < 0 ||
			!Number.isInteger(day.contributionLevel) ||
			day.contributionLevel < 0 ||
			day.contributionLevel > 4
		) {
			throw new Error(`Contribution day data for ${username} is malformed.`);
		}

		return {
			date: day.date,
			contributionCount: day.contributionCount,
			contributionLevel: day.contributionLevel,
		};
	});

	if (weeks.length !== 52 || days.length !== 364) {
		throw new Error(`Contribution data for ${username} must contain 52 weeks and 364 days.`);
	}

	return { username: payload.username || username, weeks, days };
};

export const calculateStats = (days) => {
	const total = days.reduce((sum, day) => sum + day.contributionCount, 0);
	let longestStreak = 0;
	let streak = 0;

	for (const day of days) {
		if (day.contributionCount > 0) {
			streak += 1;
			longestStreak = Math.max(longestStreak, streak);
		} else {
			streak = 0;
		}
	}

	let currentStreak = 0;
	for (let index = days.length - 1; index >= 0 && days[index].contributionCount > 0; index -= 1) {
		currentStreak += 1;
	}

	const peakDay = days.reduce((peak, day) => (
		day.contributionCount > (peak?.contributionCount ?? -1) ? day : peak
	), days[0]);
	const activeDays = days.filter((day) => day.contributionCount > 0).length;

	return {
		total,
		longestStreak,
		currentStreak,
		peakCount: peakDay?.contributionCount ?? 0,
		peakDate: peakDay?.date ?? 'No active day',
		consistency: days.length ? Math.round((activeDays / days.length) * 100) : 0,
	};
};

export const scoreBattle = (firstStats, secondStats) => {
	const categories = ['total', 'longestStreak', 'currentStreak', 'peakCount', 'consistency'];
	let firstScore = 0;
	let secondScore = 0;

	const winners = categories.map((category) => {
		if (firstStats[category] > secondStats[category]) {
			firstScore += 1;
			return 1;
		}
		if (secondStats[category] > firstStats[category]) {
			secondScore += 1;
			return 2;
		}
		firstScore += 0.5;
		secondScore += 0.5;
		return 0;
	});

	return { firstScore, secondScore, winners };
};
