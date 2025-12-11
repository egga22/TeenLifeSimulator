export function fashionPopularity({ weeksSinceOutfit, initialBoost }) {
  const weeks = Math.max(0, weeksSinceOutfit);
  const decayFraction = Math.min(1, weeks / 4);
  const currentBoost = Math.round(initialBoost * (1 - decayFraction));
  return currentBoost;
}
