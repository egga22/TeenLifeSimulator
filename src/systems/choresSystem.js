const CHORE_TIERS = [
  { tier: 1, durationMinutes: [15, 30], pay: [1, 3] },
  { tier: 2, durationMinutes: [30, 45], pay: [4, 6] },
  { tier: 3, durationMinutes: [60, 90], pay: [7, 10] }
];

function randomBetween([min, max]) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateChore(tier = 1, forced = false) {
  const config = CHORE_TIERS.find((item) => item.tier === tier) ?? CHORE_TIERS[0];
  const finalTier = forced ? 1 : config.tier;
  const finalConfig = CHORE_TIERS.find((item) => item.tier === finalTier);
  return {
    tier: finalTier,
    durationMinutes: randomBetween(finalConfig.durationMinutes),
    pay: forced ? finalConfig.pay[0] : randomBetween(finalConfig.pay),
    forced
  };
}

export { CHORE_TIERS };
