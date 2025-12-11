import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  getGradeFromStudyHours,
  getCurfewFromGrade,
  getAllowanceFromGrade,
  TimeSystem,
  RelationshipSystem,
  RumorSystem,
  generateChore,
  evaluateTryout,
  canBeCaptain,
  FashionItem
} from '../src/index.js';
import { TeenLifeSimulator } from '../src/TeenLifeSimulator.js';

describe('Grade calculations', () => {
  it('maps study hours to grade tiers', () => {
    assert.equal(getGradeFromStudyHours(52), 'A+');
    assert.equal(getGradeFromStudyHours(33), 'B');
    assert.equal(getGradeFromStudyHours(11), 'C-');
    assert.equal(getGradeFromStudyHours(5), 'F');
  });

  it('derives curfew and allowance from grades', () => {
    assert.equal(getCurfewFromGrade('A', false), '11:00 PM');
    assert.equal(getCurfewFromGrade('B', true), '11:00 PM');
    assert.equal(getCurfewFromGrade('C-', false), '9:00 PM');
    assert.equal(getCurfewFromGrade('F', true), '9:00 PM');

    assert.equal(getAllowanceFromGrade('A+'), 15);
    assert.equal(getAllowanceFromGrade('B-'), 10);
    assert.equal(getAllowanceFromGrade('C'), 5);
    assert.equal(getAllowanceFromGrade('F'), 0);
  });
});

describe('Time system', () => {
  it('advances time in 15 minute blocks', () => {
    const time = new TimeSystem(1, 7, 0);
    assert.equal(time.advance(15), '7:15 AM');
    assert.equal(time.advance(45), '8:00 AM');
    assert.throws(() => time.advance(10));
  });
});

describe('Relationship decay and rumors', () => {
  it('decays based on relationship type', () => {
    const system = new RelationshipSystem();
    system.addRelationship('Alex', 'friend', 60);
    system.addRelationship('Jordan', 'bestFriend', 60);
    system.addRelationship('Taylor', 'partner', 60);

    system.decayAll(10);
    const summary = system.summary();
    assert.equal(summary.find((r) => r.name === 'Alex').score, 58);
    assert.equal(summary.find((r) => r.name === 'Jordan').score, 59);
    assert.equal(summary.find((r) => r.name === 'Taylor').score, 57);
  });

  it('rumors reduce popularity and relationships', () => {
    const stats = { popularity: 50 };
    const relationships = new RelationshipSystem();
    relationships.addRelationship('Alex', 'friend', 60);
    const rumors = new RumorSystem(stats, relationships);

    const result = rumors.spreadRumor('medium');
    assert.equal(result.popularityAfter, 38);
    assert.equal(relationships.summary()[0].score, 56);
  });
});

describe('Chores and sports', () => {
  it('generates forced tier one chores', () => {
    const chore = generateChore(3, true);
    assert.equal(chore.tier, 1);
    assert.equal(chore.pay, 1);
  });

  it('evaluates tryout thresholds and captaincy', () => {
    assert.equal(evaluateTryout(7), 'Varsity');
    assert.equal(evaluateTryout(5), 'JV');
    assert.equal(evaluateTryout(1), 'No team');
    assert.ok(canBeCaptain(7, 75));
    assert.ok(!canBeCaptain(5, 80));
  });
});

describe('Fashion decay', () => {
  it('decays linearly over four weeks', () => {
    const hoodie = new FashionItem('Hoodie', 20);
    assert.equal(hoodie.currentBoost, 20);
    hoodie.advanceWeek();
    assert.equal(hoodie.currentBoost, 15);
    hoodie.advanceWeek();
    hoodie.advanceWeek();
    hoodie.advanceWeek();
    assert.equal(hoodie.currentBoost, 0);
  });
});

describe('TeenLifeSimulator facade', () => {
  it('combines systems into a usable summary', () => {
    const sim = new TeenLifeSimulator({ popularity: 55, athleticism: 6, monthlyStudyHours: 20 });
    sim.addRelationship('Alex', 'friend', 70);
    sim.addFashionItem('Sneakers', 20);
    sim.addStudyHours(25);
    const summary = sim.summary();

    assert.equal(summary.stats.grade, 'A');
    assert.equal(summary.curfewWeekend, '12:00 AM');
    assert.equal(sim.tryoutForSports(), 'Varsity');
    assert.ok(sim.canCaptain());
  });
});
