const WEEKS_TO_DECAY = 4;

export class FashionItem {
  constructor(name, popularityBoost) {
    this.name = name;
    this.initialBoost = popularityBoost;
    this.weeksWorn = 0;
  }

  get currentBoost() {
    const decayPerWeek = this.initialBoost / WEEKS_TO_DECAY;
    const reduction = this.weeksWorn * decayPerWeek;
    return Math.max(0, this.initialBoost - reduction);
  }

  advanceWeek() {
    this.weeksWorn += 1;
    return this.currentBoost;
  }
}

export { WEEKS_TO_DECAY };
