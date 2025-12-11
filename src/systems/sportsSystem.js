const TRYOUT_THRESHOLDS = [
  { min: 6, team: 'Varsity' },
  { min: 4, team: 'JV' },
  { min: 0, team: 'No team' }
];

export function evaluateTryout(athleticism) {
  const match = TRYOUT_THRESHOLDS.find(({ min }) => athleticism >= min);
  return match?.team ?? 'No team';
}

export function canBeCaptain(athleticism, popularity) {
  return athleticism >= 6 && popularity >= 70;
}

export const SPORTS_RULES = {
  tryouts: TRYOUT_THRESHOLDS,
  monthlyBigGame: 'Week 3 Friday'
};
