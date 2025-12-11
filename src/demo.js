import { GameState } from "./game.js";

const game = new GameState();

console.log("Initial state:", {
  popularity: game.popularity,
  money: game.money,
  happiness: game.happiness
});

game.logStudyHours(18);
game.logStudyHours(12);
console.log("Month end:", game.monthEnd());

const outfitBoost = game.wearOutfit({ initialBoost: 12, weeksSinceOutfit: 1 });
console.log(`Outfit boost applied: +${outfitBoost} popularity -> ${game.popularity}`);

const rumorResult = game.applyRumor({ severity: "medium" });
console.log("Rumor impact:", rumorResult);

const friendScore = game.updateFriendship("Alex", {
  type: "friend",
  daysSinceInteraction: 7,
  interactionEffect: 5
});
console.log("Updated friendship with Alex:", friendScore);

const romanceScore = game.updateRomance({
  daysSinceInteraction: 4,
  rumorPenalty: 3,
  interactionEffect: 2
});
console.log("Romance score:", romanceScore);

const choreResult = game.doChore(2);
console.log("Chore completed:", choreResult, "Total money:", game.money);

console.log("Skip school consequence:", game.skipSchool());
console.log("Semester report:", game.semesterReport());
