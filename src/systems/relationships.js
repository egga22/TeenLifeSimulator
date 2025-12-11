import { FRIENDSHIP_DECAY_DAYS } from "../constants.js";

function decayValue({ daysSinceInteraction, decayEvery, currentValue }) {
  if (daysSinceInteraction <= 0) return currentValue;
  const decaySteps = Math.floor(daysSinceInteraction / decayEvery);
  return Math.max(0, currentValue - decaySteps);
}

export function updateFriendshipScore({
  type = "friend",
  daysSinceInteraction = 0,
  score = 50
}) {
  const decayEvery = FRIENDSHIP_DECAY_DAYS[type];
  if (!decayEvery) return score;
  return decayValue({ daysSinceInteraction, decayEvery, currentValue: score });
}

export function applyInteraction({ score, effect }) {
  return Math.max(0, Math.min(100, score + effect));
}

export function romanceHealth({ score, daysSinceInteraction, rumorPenalty = 0 }) {
  const decayedScore = updateFriendshipScore({
    type: "partner",
    daysSinceInteraction,
    score
  });
  return Math.max(0, decayedScore - rumorPenalty);
}
