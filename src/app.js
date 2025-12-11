import { GameState } from "./game.js";

let game = new GameState();

const statIds = {
  popularity: "stat-popularity",
  happiness: "stat-happiness",
  athleticism: "stat-athleticism",
  money: "stat-money",
  studyHoursThisMonth: "stat-study",
  romanceScore: "stat-romance"
};

function renderStats() {
  const statMap = {
    popularity: game.popularity,
    happiness: game.happiness,
    athleticism: game.athleticism,
    money: `$${game.money.toFixed(2)}`,
    studyHoursThisMonth: game.studyHoursThisMonth,
    romanceScore: game.romanceScore
  };

  Object.entries(statIds).forEach(([key, id]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = statMap[key];
  });
}

function addLog(message) {
  const log = document.getElementById("log");
  const entry = document.createElement("p");
  entry.className = "log-entry";
  entry.textContent = message;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

function resetLog() {
  const log = document.getElementById("log");
  log.innerHTML = "";
}

function wireControls() {
  document.getElementById("add-study")?.addEventListener("click", () => {
    const hours = Number(document.getElementById("study-hours").value) || 0;
    game.logStudyHours(hours);
    renderStats();
    addLog(`Logged ${hours} study hour(s).`);
  });

  document.getElementById("close-month")?.addEventListener("click", () => {
    const report = game.monthEnd();
    renderStats();
    addLog(
      `Month closed: grade ${report.grade}, allowance $${report.allowance}, ` +
        `${report.hours} study hours. Teacher comment: ${report.teacherComment}`
    );
  });

  document.getElementById("apply-rumor")?.addEventListener("click", () => {
    const severity = document.getElementById("rumor-severity").value;
    const positive = document.getElementById("rumor-positive").checked;
    const result = game.applyRumor({ severity, positive });
    renderStats();
    addLog(
      `${positive ? "Positive" : "Negative"} rumor (${severity}) ` +
        `${result.delta >= 0 ? "+" : ""}${result.delta} popularity -> ${result.popularity}`
    );
  });

  document.getElementById("apply-outfit")?.addEventListener("click", () => {
    const initialBoost = Number(document.getElementById("outfit-boost").value) || 0;
    const weeksSinceOutfit = Number(document.getElementById("weeks-since").value) || 0;
    const boost = game.wearOutfit({ initialBoost, weeksSinceOutfit });
    renderStats();
    addLog(`Outfit applied: +${boost.toFixed(2)} popularity.`);
  });

  document.getElementById("do-chore")?.addEventListener("click", () => {
    const tier = Number(document.getElementById("chore-tier").value) || 1;
    const result = game.doChore(tier);
    renderStats();
    addLog(`Chore tier ${tier}: ${result.durationMinutes} mins, earned $${result.pay.toFixed(2)}.`);
  });

  document.getElementById("update-friend")?.addEventListener("click", () => {
    const name = document.getElementById("friend-name").value.trim() || "Alex";
    const type = document.getElementById("friend-type").value;
    const daysSinceInteraction = Number(document.getElementById("friend-days").value) || 0;
    const interactionEffect = Number(document.getElementById("friend-effect").value) || 0;
    const score = game.updateFriendship(name, { type, daysSinceInteraction, interactionEffect });
    renderStats();
    addLog(`Friendship with ${name} (${type}): ${score.toFixed(1)}.`);
  });

  document.getElementById("update-romance")?.addEventListener("click", () => {
    const daysSinceInteraction = Number(document.getElementById("romance-days").value) || 0;
    const rumorPenalty = Number(document.getElementById("romance-penalty").value) || 0;
    const interactionEffect = Number(document.getElementById("romance-effect").value) || 0;
    const score = game.updateRomance({ daysSinceInteraction, rumorPenalty, interactionEffect });
    renderStats();
    addLog(`Romance updated: score ${score.toFixed(1)}.`);
  });

  document.getElementById("skip-school")?.addEventListener("click", () => {
    const result = game.skipSchool();
    renderStats();
    const detail = result.consequence === "detention"
      ? "Saturday detention"
      : `Parent punishment${result.allowanceBlocked ? " (allowance blocked)" : ""}`;
    addLog(`Skipped school: ${detail}. Forced chore: ${result.forcedChore ? `${result.forcedChore.durationMinutes} mins for $${result.forcedChore.pay.toFixed(2)}` : "none"}.`);
  });

  document.getElementById("reset-state")?.addEventListener("click", () => {
    game = new GameState();
    renderStats();
    addLog("Game state reset to defaults.");
  });

  document.getElementById("clear-log")?.addEventListener("click", resetLog);
}

document.addEventListener("DOMContentLoaded", () => {
  renderStats();
  wireControls();
  addLog("Welcome! Use the controls to exercise the core systems.");
});
