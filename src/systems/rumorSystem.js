const RUMOR_IMPACT = {
  everyday: { popularity: 5 },
  medium: { popularity: 12 },
  heavy: { popularity: 16 }
};

export class RumorSystem {
  constructor(stats, relationships) {
    this.stats = stats;
    this.relationships = relationships;
  }

  spreadRumor(severity = 'everyday') {
    const config = RUMOR_IMPACT[severity];
    if (!config) throw new Error('Unknown rumor severity');
    this.stats.popularity = clamp(this.stats.popularity - config.popularity, 0, 100);
    const relationshipPenalty = Math.ceil(config.popularity / 3);
    this.relationships.applyRumorToAll(relationshipPenalty);
    return {
      severity,
      popularityAfter: this.stats.popularity,
      relationshipPenalty
    };
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export const RUMOR_SEVERITIES = RUMOR_IMPACT;
