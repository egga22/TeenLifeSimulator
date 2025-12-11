import { allowanceForGrade, gradeFromStudyHours, semesterReportCard } from "./systems/grades.js";
import { fashionPopularity } from "./systems/fashion.js";
import { rumorCost, rumorImpact } from "./systems/rumors.js";
import { applyInteraction, romanceHealth, updateFriendshipScore } from "./systems/relationships.js";
import { choreReward, forcedChoreReward } from "./systems/chores.js";

export class GameState {
  constructor() {
    this.popularity = 50;
    this.athleticism = 3;
    this.happiness = 70;
    this.money = 0;
    this.friendshipScores = new Map();
    this.romanceScore = 50;
    this.studyHoursThisMonth = 0;
    this.studyLog = [];
  }

  logStudyHours(hours) {
    this.studyHoursThisMonth += Math.max(0, hours);
  }

  monthEnd() {
    const grade = gradeFromStudyHours(this.studyHoursThisMonth);
    const allowance = allowanceForGrade(grade);
    this.money += allowance;
    this.studyLog.push(this.studyHoursThisMonth);

    const report = {
      grade,
      allowance,
      hours: this.studyHoursThisMonth,
      teacherComment: semesterReportCard(this.studyLog).teacherComment
    };

    this.studyHoursThisMonth = 0;
    return report;
  }

  applyRumor({ severity, positive = false }) {
    const handler = positive ? rumorImpact : rumorCost;
    const { popularity, delta } = handler({
      severity,
      basePopularity: this.popularity
    });

    this.popularity = popularity;
    this.happiness = Math.max(0, Math.min(100, this.happiness + delta / 2));
    return { popularity: this.popularity, delta };
  }

  wearOutfit({ initialBoost, weeksSinceOutfit = 0 }) {
    const boost = fashionPopularity({ initialBoost, weeksSinceOutfit });
    this.popularity = Math.min(100, this.popularity + boost);
    return boost;
  }

  doChore(tier) {
    const { durationMinutes, pay } = choreReward(tier);
    this.money += pay;
    return { durationMinutes, pay };
  }

  skipSchool() {
    const roll = Math.random();
    const consequence = roll < 0.5 ? "detention" : "parentPunishment";
    let forcedChore = null;
    let allowanceBlocked = false;

    if (consequence === "parentPunishment") {
      allowanceBlocked = true;
      forcedChore = forcedChoreReward();
      this.money += forcedChore.pay;
    }

    this.happiness = Math.min(100, this.happiness + 5);
    return { consequence, forcedChore, allowanceBlocked };
  }

  updateFriendship(name, { type, daysSinceInteraction, interactionEffect = 0 }) {
    const current = this.friendshipScores.get(name) ?? 50;
    const decayed = updateFriendshipScore({
      type,
      daysSinceInteraction,
      score: current
    });
    const updated = applyInteraction({ score: decayed, effect: interactionEffect });
    this.friendshipScores.set(name, updated);
    return updated;
  }

  updateRomance({ daysSinceInteraction, rumorPenalty = 0, interactionEffect = 0 }) {
    const decayed = romanceHealth({
      score: this.romanceScore,
      daysSinceInteraction,
      rumorPenalty
    });
    this.romanceScore = applyInteraction({ score: decayed, effect: interactionEffect });
    return this.romanceScore;
  }

  semesterReport() {
    return semesterReportCard(this.studyLog);
  }
}
