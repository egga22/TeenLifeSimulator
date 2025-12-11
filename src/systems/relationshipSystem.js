const RELATIONSHIP_DECAY = {
  friend: { days: 5, amount: 1 },
  bestFriend: { days: 10, amount: 1 },
  partner: { days: 3, amount: 1 }
};

export class Relationship {
  constructor(name, type = 'friend', score = 50) {
    this.name = name;
    this.type = type;
    this.score = score;
  }

  decay(daysPassed) {
    const config = RELATIONSHIP_DECAY[this.type];
    if (!config) return this.score;
    const steps = Math.floor(daysPassed / config.days);
    this.score = Math.max(0, this.score - steps * config.amount);
    return this.score;
  }

  applyRumor(impact = 5) {
    this.score = Math.max(0, this.score - impact);
    return this.score;
  }

  boost(amount) {
    this.score = Math.min(100, this.score + amount);
    return this.score;
  }
}

export class RelationshipSystem {
  constructor() {
    this.relationships = new Map();
  }

  addRelationship(name, type = 'friend', initialScore = 50) {
    const relation = new Relationship(name, type, initialScore);
    this.relationships.set(name, relation);
    return relation;
  }

  decayAll(daysPassed) {
    this.relationships.forEach((relation) => relation.decay(daysPassed));
  }

  applyRumorToAll(impact) {
    this.relationships.forEach((relation) => relation.applyRumor(impact));
  }

  summary() {
    return Array.from(this.relationships.values()).map((relation) => ({
      name: relation.name,
      type: relation.type,
      score: relation.score
    }));
  }
}

export const RELATIONSHIP_DECAY_RULES = RELATIONSHIP_DECAY;
