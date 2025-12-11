import { getGradeFromStudyHours, getCurfewFromGrade, getAllowanceFromGrade } from './systems/gradeSystem.js';
import { TimeSystem } from './systems/timeSystem.js';
import { RelationshipSystem } from './systems/relationshipSystem.js';
import { RumorSystem } from './systems/rumorSystem.js';
import { generateChore } from './systems/choresSystem.js';
import { evaluateTryout, canBeCaptain } from './systems/sportsSystem.js';
import { FashionItem } from './systems/fashionSystem.js';

export class TeenLifeSimulator {
  constructor(initialStats = {}) {
    this.stats = {
      popularity: initialStats.popularity ?? 50,
      athleticism: initialStats.athleticism ?? 5,
      happiness: initialStats.happiness ?? 70,
      money: initialStats.money ?? 0,
      monthlyStudyHours: initialStats.monthlyStudyHours ?? 0,
      romanceLevel: initialStats.romanceLevel ?? 50
    };

    this.time = new TimeSystem();
    this.relationships = new RelationshipSystem();
    this.rumors = new RumorSystem(this.stats, this.relationships);
    this.fashion = [];
  }

  addStudyHours(hours) {
    if (hours < 0) throw new Error('Cannot add negative study hours');
    this.stats.monthlyStudyHours += hours;
    return this.currentGrade;
  }

  get currentGrade() {
    return getGradeFromStudyHours(this.stats.monthlyStudyHours);
  }

  get weeklyAllowance() {
    return getAllowanceFromGrade(this.currentGrade);
  }

  advanceTime(minutes) {
    return this.time.advance(minutes);
  }

  addRelationship(name, type, initialScore) {
    return this.relationships.addRelationship(name, type, initialScore);
  }

  applyRumor(severity) {
    return this.rumors.spreadRumor(severity);
  }

  performChore(tier = 1, forced = false) {
    const chore = generateChore(tier, forced);
    this.stats.money += chore.pay;
    return chore;
  }

  tryoutForSports() {
    return evaluateTryout(this.stats.athleticism);
  }

  canCaptain() {
    return canBeCaptain(this.stats.athleticism, this.stats.popularity);
  }

  getCurfew(isWeekend = false) {
    return getCurfewFromGrade(this.currentGrade, isWeekend);
  }

  addFashionItem(name, popularityBoost) {
    const item = new FashionItem(name, popularityBoost);
    this.fashion.push(item);
    this.stats.popularity = Math.min(100, this.stats.popularity + item.currentBoost);
    return item;
  }

  endOfWeek() {
    this.stats.money += this.weeklyAllowance;
    this.relationships.decayAll(7);
    this.fashion.forEach((item) => item.advanceWeek());
    return this.summary();
  }

  summary() {
    return {
      stats: { ...this.stats, grade: this.currentGrade },
      relationships: this.relationships.summary(),
      curfewWeekday: this.getCurfew(false),
      curfewWeekend: this.getCurfew(true)
    };
  }
}
