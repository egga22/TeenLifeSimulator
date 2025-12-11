import { RUMOR_SEVERITY } from "../constants.js";

export function rumorImpact({ severity, basePopularity }) {
  const severityConfig = RUMOR_SEVERITY[severity];
  if (!severityConfig) return { popularity: basePopularity, delta: 0 };

  const [min, max] = severityConfig.deltaRange;
  const delta = Math.round((min + max) / 2);
  const newPopularity = Math.max(0, Math.min(100, basePopularity + delta));

  return { popularity: newPopularity, delta };
}

export function rumorCost({ severity, basePopularity }) {
  const severityConfig = RUMOR_SEVERITY[severity];
  if (!severityConfig) return { popularity: basePopularity, delta: 0 };

  const [min, max] = severityConfig.deltaRange;
  const delta = -Math.round((min + max) / 2);
  const newPopularity = Math.max(0, Math.min(100, basePopularity + delta));

  return { popularity: newPopularity, delta };
}
