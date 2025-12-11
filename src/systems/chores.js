import { CHORE_TIERS } from "../constants.js";

export function choreReward(tier) {
  const config = CHORE_TIERS[tier];
  if (!config) {
    return { durationMinutes: 0, pay: 0 };
  }

  const [minDuration, maxDuration] = config.durationRange;
  const [minPay, maxPay] = config.payRange;
  const durationMinutes = Math.round((minDuration + maxDuration) / 2);
  const pay = Math.round((minPay + maxPay) / 2);

  return { durationMinutes, pay };
}

export function forcedChoreReward() {
  return choreReward(1);
}
