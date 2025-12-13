const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const MINUTES_PER_BLOCK = 15;
const SCHOOL_START = 8 * 60;
const SCHOOL_END = 15 * 60; // 3 PM
const BIKE_COMMUTE = 30; // minutes
const CLIQUE_WEIGHTS = {
  popular: 0.7,
  athletes: 0.2,
  others: 0.1
};

const friends = [
  { name: "Jordan", loyalty: 65, tier: "Friend" },
  { name: "Avery", loyalty: 72, tier: "Friend" },
  { name: "Sky", loyalty: 80, tier: "Best Friend" },
  { name: "Riley", loyalty: 55, tier: "Friend" },
  { name: "Parker", loyalty: 60, tier: "Best Friend" }
];

const state = {
  year: 1,
  semester: 1,
  monthIndex: 0, // start in September
  week: 1,
  day: 1,
  monthDay: 1,
  minuteOfDay: 7 * 60 + 30,
  blocksToday: 0,
  studyHoursThisMonth: 0,
  popularity: 40,
  athleticism: 4,
  happiness: 75,
  energy: 70,
  stress: 20,
  sleepDebt: 0,
  wellnessStreak: 0,
  money: 20,
  fashionFreshness: 28, // days remaining of the current outfit's influence
  romanceLevel: 0,
  partner: null,
  bestMomentPopularitySpike: 0,
  punishment: null,
  announcements: [],
  gradeHistory: [],
  events: [],
  achievements: [],
  textCountWeek: 0,
  friendTextsRemaining: 4,
  partnerTextsRemaining: 0,
  eventTextsRemaining: 1,
  sportsTier: "None",
  lastRumorDay: 0,
  clubLeadership: false,
  yearHighlights: [],
  finalScore: 0,
  resumeStrength: 10,
  leadershipCred: 5,
  scholarshipOdds: 5,
  followers: 0,
  internHours: 0,
  passionMomentum: 0,
  groundingState: "Stable",
  restfulToday: false,
  lateNightFlag: false
};

const logEl = document.getElementById("log");
const statList = document.getElementById("stat-list");
const studyHoursEl = document.getElementById("study-hours");
const gradeEl = document.getElementById("grade");
const allowanceEl = document.getElementById("allowance");
const curfewEl = document.getElementById("curfew");
const teacherCommentEl = document.getElementById("teacher-comment");
const yearEl = document.getElementById("year");
const semesterEl = document.getElementById("semester");
const monthEl = document.getElementById("month");
const weekEl = document.getElementById("week");
const dayEl = document.getElementById("day");
const weekdayEl = document.getElementById("weekday");
const clockEl = document.getElementById("clock");
const blockEl = document.getElementById("blocks");
const friendsEl = document.getElementById("friends");
const partnerEl = document.getElementById("partner");
const romanceLevelEl = document.getElementById("romance-level");
const textCountEl = document.getElementById("text-count");
const eventsEl = document.getElementById("events");
const achievementsEl = document.getElementById("achievements");
const gradeHistoryEl = document.getElementById("grade-history");
const phoneGradeEl = document.getElementById("phone-grade");
const phoneStudyEl = document.getElementById("phone-study");
const announcementsEl = document.getElementById("announcements");
const punishmentEl = document.getElementById("punishment-summary");
const highlightReelEl = document.getElementById("highlight-reel");
const yearScoreEl = document.getElementById("year-score");
const friendPlanEl = document.getElementById("friend-text-plan");
const partnerPlanEl = document.getElementById("partner-text-plan");
const rumorCadenceEl = document.getElementById("rumor-cadence");
const energyEl = document.getElementById("energy");
const stressEl = document.getElementById("stress");
const sleepDebtEl = document.getElementById("sleep-debt");
const burnoutEl = document.getElementById("burnout");
const groundingEl = document.getElementById("grounding");
const wellnessStreakEl = document.getElementById("wellness-streak");
const resumeEl = document.getElementById("resume");
const leadershipEl = document.getElementById("leadership");
const scholarshipEl = document.getElementById("scholarship");
const followersEl = document.getElementById("followers");
const internHoursEl = document.getElementById("intern-hours");
const momentumEl = document.getElementById("momentum");

const actions = document.querySelectorAll("button[data-action]");

function formatTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const period = h >= 12 ? "PM" : "AM";
  const displayHour = ((h + 11) % 12) + 1;
  return `${displayHour}:${m.toString().padStart(2, "0")} ${period}`;
}

function gradeFromHours(hours) {
  if (hours >= 50) return "A+";
  if (hours >= 45) return "A";
  if (hours >= 40) return "A–";
  if (hours >= 35) return "B+";
  if (hours >= 30) return "B";
  if (hours >= 25) return "B–";
  if (hours >= 20) return "C+";
  if (hours >= 15) return "C";
  if (hours >= 10) return "C–";
  return "F";
}

function gradeToPoints(letter) {
  const map = {
    "A+": 100,
    A: 95,
    "A–": 92,
    "B+": 88,
    B: 85,
    "B–": 82,
    "C+": 78,
    C: 75,
    "C–": 72,
    F: 60
  };
  return map[letter] || 60;
}

function allowanceFromGrade(letter) {
  if (["A+", "A", "A–"].includes(letter)) return 15;
  if (["B+", "B", "B–"].includes(letter)) return 10;
  if (["C+", "C", "C–"].includes(letter)) return 5;
  return 0;
}

function curfewFromGrade(letter, isWeekend) {
  const map = {
    "A+": { weekday: 23, weekend: 24 },
    "A": { weekday: 23, weekend: 24 },
    "A–": { weekday: 23, weekend: 24 },
    "B+": { weekday: 22, weekend: 23 },
    "B": { weekday: 22, weekend: 23 },
    "B–": { weekday: 22, weekend: 23 },
    "C+": { weekday: 21, weekend: 22 },
    "C": { weekday: 21, weekend: 22 },
    "C–": { weekday: 21, weekend: 22 },
    F: { weekday: 20, weekend: 21 }
  };
  const entry = map[letter] || map.F;
  const hour = isWeekend ? entry.weekend : entry.weekday;
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = ((hour + 11) % 12) + 1;
  return `${displayHour}:00 ${period}`;
}

function teacherCommentFromGrade(letter) {
  const comments = {
    "A+": "A beacon in class; ready for honors recs.",
    "A": "Great mastery, keep stretching yourself.",
    "A–": "Strong work, polish the details for the next leap.",
    "B+": "Solid strides—consistency will push you higher.",
    "B": "Capable and steady, but missing spark moments.",
    "B–": "Stay focused; deadlines are closer than they seem.",
    "C+": "You understand it—more practice locks it in.",
    "C": "Show up, ask questions, and the grade will follow.",
    "C–": "Finish homework; small wins add up.",
    F: "Missing work. See me after class—you're too bright to fail."
  };
  return comments[letter] || comments.F;
}

function burnoutLabel() {
  const load = state.stress + state.sleepDebt * 6 - state.energy;
  if (load >= 90) return "Critical";
  if (load >= 70) return "High";
  if (load >= 45) return "Moderate";
  return "Low";
}

function momentumLabel() {
  if (state.passionMomentum > 60) return "Buzzing";
  if (state.passionMomentum > 35) return "Rolling";
  return "Calm";
}

function render() {
  statList.innerHTML = `
    <li><strong>Popularity:</strong> ${state.popularity}</li>
    <li><strong>Athleticism:</strong> ${state.athleticism.toFixed(1)}/10 (${state.sportsTier})</li>
    <li><strong>Happiness:</strong> ${state.happiness}</li>
    <li><strong>Money:</strong> $${state.money.toFixed(2)}</li>
    <li><strong>Fashion freshness:</strong> ${Math.max(state.fashionFreshness, 0)} days</li>
  `;

  const grade = gradeFromHours(state.studyHoursThisMonth);
  const allowance = allowanceFromGrade(grade);
  const weekday = WEEKDAYS[(state.day - 1) % 7];
  const isWeekend = ["Sat", "Sun"].includes(weekday);
  const curfew = curfewFromGrade(grade, isWeekend);
  const scholarshipOdds = Math.min(
    95,
    Math.round((state.resumeStrength * 0.4 + state.leadershipCred * 0.2 + gradeToPoints(grade) / 1.5) / 3)
  );
  state.scholarshipOdds = scholarshipOdds;

  studyHoursEl.textContent = state.studyHoursThisMonth;
  gradeEl.textContent = grade;
  allowanceEl.textContent = allowance;
  curfewEl.textContent = curfew;
  teacherCommentEl.textContent = teacherCommentFromGrade(grade);

  yearEl.textContent = state.year;
  semesterEl.textContent = state.semester;
  monthEl.textContent = MONTHS[state.monthIndex];
  weekEl.textContent = state.week;
  dayEl.textContent = state.day;
  weekdayEl.textContent = weekday;
  clockEl.textContent = formatTime(state.minuteOfDay);
  blockEl.textContent = state.blocksToday;

  friendsEl.innerHTML = friends
    .map(f => `<li><strong>${f.name}</strong> — ${f.tier} — Loyalty ${f.loyalty.toFixed(1)}</li>`)
    .join("");

  partnerEl.textContent = state.partner || "None";
  romanceLevelEl.textContent = state.romanceLevel.toFixed(1);
  textCountEl.textContent = state.textCountWeek;

  eventsEl.innerHTML = state.events
    .map(evt => `<li><strong>${evt.name}</strong> — ${evt.timing} (${evt.effect})</li>`)
    .join("");

  achievementsEl.innerHTML = state.achievements
    .slice(-6)
    .map(a => `<li>${a}</li>`)
    .join("") || '<li class="muted">No achievements yet.</li>';

  gradeHistoryEl.innerHTML = state.gradeHistory
    .map(card => `<li><strong>${card.month}</strong>: ${card.grade} (${card.hours} hrs) — ${card.comment}</li>`)
    .join("") || '<li class="muted">No cards yet.</li>';

  phoneGradeEl.textContent = grade;
  phoneStudyEl.textContent = state.studyHoursThisMonth;

  announcementsEl.innerHTML = state.announcements
    .slice(-5)
    .map(note => `<li>${note}</li>`)
    .join("") || '<li class="muted">Quiet feed today.</li>';

  punishmentEl.textContent = state.punishment
    ? `${state.punishment.reason} — ${state.punishment.duration} day(s) left`
    : "No punishments active.";

  highlightReelEl.innerHTML = state.yearHighlights
    .slice(0, 4)
    .map(note => `<li>${note}</li>`)
    .join("") || '<li class="muted">Finish a school year to unlock highlights.</li>';

  yearScoreEl.textContent = state.finalScore.toFixed(1);
  friendPlanEl.textContent = `${state.friendTextsRemaining} texts remaining this week`;
  partnerPlanEl.textContent = state.partner
    ? `${state.partnerTextsRemaining} check-ins planned`
    : "No partner texts scheduled";
  rumorCadenceEl.textContent = `Rumors roll every ~${state.lastRumorDay ? Math.max(1, Math.round((state.day - state.lastRumorDay) / 7)) : 1}-2 weeks.`;

  energyEl.textContent = state.energy.toFixed(0);
  stressEl.textContent = state.stress.toFixed(0);
  sleepDebtEl.textContent = state.sleepDebt.toFixed(1);
  burnoutEl.textContent = burnoutLabel();
  groundingEl.textContent = state.groundingState;
  wellnessStreakEl.textContent = state.wellnessStreak;
  resumeEl.textContent = state.resumeStrength.toFixed(0);
  leadershipEl.textContent = state.leadershipCred.toFixed(0);
  scholarshipEl.textContent = state.scholarshipOdds;
  followersEl.textContent = state.followers;
  internHoursEl.textContent = state.internHours.toFixed(1);
  momentumEl.textContent = momentumLabel();
}

function log(message, tag = "LOG", tone = "warn") {
  const entry = document.createElement("div");
  entry.className = "log-entry";
  entry.innerHTML = `<span class="badge ${tone}">${tag}</span> <strong>${MONTHS[state.monthIndex]} ${state.monthDay}</strong> — ${message}`;
  logEl.prepend(entry);
}

function advanceMinutes(minutes) {
  const projected = state.minuteOfDay + minutes;
  if (!state.lateNightFlag && state.minuteOfDay < 22 * 60 && projected >= 22 * 60) {
    state.sleepDebt = Math.min(12, state.sleepDebt + 1);
    state.lateNightFlag = true;
  }
  state.minuteOfDay = projected;
  state.blocksToday += Math.ceil(minutes / MINUTES_PER_BLOCK);

  if (state.minuteOfDay >= 24 * 60) {
    state.minuteOfDay -= 24 * 60;
    endDay();
  }
}

function endDay() {
  state.day += 1;
  state.monthDay += 1;
  const weekday = WEEKDAYS[(state.day - 1) % 7];
  state.week = Math.ceil(state.monthDay / 7);
  applyDailyWellness(state.blocksToday);
  state.blocksToday = 0;
  applyFriendshipDecay();
  applyRomanceDecay();
  decayFashion();
  handleAllowanceIfNeeded();
  handleNewMonthIfNeeded();
  checkPunishments();
  generateAnnouncements();
  npcEvents();

  state.restfulToday = false;
  state.lateNightFlag = false;

  if (state.week > 4 && state.monthDay <= 30) {
    state.week = 4;
  }

  if (weekday === "Mon") {
    state.textCountWeek = 0; // weekly reset for texting cadence
    scheduleWeeklyTexts();
  }

  handleNpcTexts();
  triggerScheduledEvents(weekday);
}

function handleNewMonthIfNeeded() {
  if (state.monthDay > 30) {
    const grade = gradeFromHours(state.studyHoursThisMonth);
    const comment = teacherCommentFromGrade(grade);
    state.gradeHistory.unshift({
      month: MONTHS[state.monthIndex],
      grade,
      hours: state.studyHoursThisMonth,
      comment
    });
    if (state.gradeHistory.length > 8) state.gradeHistory.pop();

    if (state.studyHoursThisMonth > 50) {
      unlockAchievement("Study Machine: 50+ hours in a month");
    }

    const endingMonth = state.monthIndex;
    if (endingMonth === MONTHS.length - 1) {
      evaluateYearEnd();
    }

    state.monthIndex = (state.monthIndex + 1) % MONTHS.length;
    state.semester = Math.min(8, Math.ceil((state.monthIndex + 1) / 2) + (state.year - 1) * 2);
    state.monthDay = 1;
    state.week = 1;
    state.studyHoursThisMonth = 0;
    state.events = scheduleEventsForMonth(MONTHS[state.monthIndex]);
    log(`New month begins. Semester pacing shifts.`, "MONTH", "warn");

    if (state.monthIndex === 0 && state.year < 4) {
      state.year += 1;
      log(`Welcome to a new school year (${state.year}/4)!`, "YEAR", "success");
    } else if (state.monthIndex === 0 && state.year === 4) {
      log("Graduation looms—this is your final push!", "YEAR", "success");
    }
  }
}

function handleAllowanceIfNeeded() {
  const weekday = WEEKDAYS[(state.day - 1) % 7];
  if (weekday === "Mon") {
    const grade = gradeFromHours(state.studyHoursThisMonth);
    const allowance = allowanceFromGrade(grade);
    if (state.punishment) {
      log("Parents are withholding allowance this week due to punishment.", "ALLOW", "danger");
      return;
    }
    state.money += allowance;
    if (allowance > 0) {
      log(`Received $${allowance} allowance for keeping grades at ${grade} range.`, "ALLOW", "success");
    } else {
      log("No allowance this week due to poor grades.", "ALLOW", "danger");
    }
  }
}

function applyFriendshipDecay() {
  friends.forEach(friend => {
    const decayRate = friend.tier === "Best Friend" ? 1 / 10 : 1 / 5;
    friend.loyalty = Math.max(0, friend.loyalty - decayRate);
  });
}

function applyRomanceDecay() {
  if (!state.partner) return;
  state.romanceLevel = Math.max(0, state.romanceLevel - 1 / 3);
  if (state.romanceLevel < 20) {
    log(`${state.partner} feels neglected; the relationship is cooling off.`, "ROMANCE", "warn");
  }
  if (state.romanceLevel <= 0) {
    log(`${state.partner} ended the relationship due to neglect.`, "BREAKUP", "danger");
    state.partner = null;
    state.partnerTextsRemaining = 0;
  }
}

function decayFashion() {
  state.fashionFreshness = Math.max(0, state.fashionFreshness - 1);
  if (state.fashionFreshness === 0) {
    state.popularity = Math.max(0, state.popularity - 5);
    log("Your outfit lost its shine. Popularity dips until you refresh your look.", "FASHION", "warn");
  }
}

function checkPunishments() {
  if (!state.punishment) return;
  state.punishment.duration -= 1;
  if (state.punishment.duration <= 0) {
    log("Parent punishment lifted. Allowance and freedom restored.", "PUNISH", "success");
    state.punishment = null;
  }
}

function applyDailyWellness(dailyBlocks = state.blocksToday) {
  const workloadStress = Math.max(0, dailyBlocks - 10) * 0.5;
  state.stress = Math.min(100, state.stress + workloadStress + state.sleepDebt * 0.5);
  state.energy = Math.max(0, state.energy - 12 - state.sleepDebt * 1.5 + (state.restfulToday ? 8 : 0));
  state.sleepDebt = state.restfulToday ? Math.max(0, state.sleepDebt - 1) : Math.min(12, state.sleepDebt + 0.5);

  if (state.energy >= 60 && state.stress <= 30) {
    state.wellnessStreak += 1;
  } else {
    state.wellnessStreak = 0;
  }

  if (state.energy <= 25 || state.stress >= 80) {
    state.groundingState = "Shaky";
    log("You feel frayed—prioritize wellness soon.", "WELL", "danger");
  } else if (state.stress >= 55) {
    state.groundingState = "Stressed";
  } else if (state.energy < 45) {
    state.groundingState = "Tired";
  } else {
    state.groundingState = "Stable";
  }
}

function npcEvents() {
  // Invites 2–4 per week average
  const inviteChance = 0.5;
  if (Math.random() < inviteChance) {
    const inviter = friends[Math.floor(Math.random() * friends.length)];
    inviter.loyalty = Math.min(100, inviter.loyalty + 1);
    log(`${inviter.name} invites you to grab food after school. Accept via Hangout for bonus!`, "INVITE", "success");
  }

  // Rumors every 1–2 weeks
  if (state.day - state.lastRumorDay > 7 && Math.random() < 0.4) {
    state.lastRumorDay = state.day;
    const swing = randomRange(5, 15);
    const negative = Math.random() < 0.6;
    adjustPopularity(negative ? -swing : swing, negative ? "NPC rumor" : "NPC praise");
  }

  if (!state.partner && Math.random() < 0.05) {
    const crush = friends[Math.floor(Math.random() * friends.length)];
    state.partner = crush.name;
    state.romanceLevel = 25;
    scheduleWeeklyTexts();
    log(`${crush.name} makes it official—you have a partner now.`, "ROMANCE", "success");
  }

  if (Math.random() < 0.12) {
    const hours = randomRange(1, 3);
    state.internHours += hours;
    adjustResume(2, "micro-intern task");
    log(`You knock out a micro-intern task online for ${hours}h credit.`, "INTERN", "success");
  }

  if (Math.random() < 0.08) {
    const followers = randomRange(10, 30);
    state.followers += followers;
    state.passionMomentum = Math.min(100, state.passionMomentum + 3);
    log(`A clip of you trends overnight (+${followers} followers)!`, "VIRAL", "success");
  }
}

function generateAnnouncements() {
  const roll = Math.random();
  if (roll < 0.35) {
    const notices = [
      "Club expo this week. Extra boosts for attending!",
      "Pep rally Friday afternoon—school spirit high!",
      "Science fair signups open. Impress teachers for grade comments.",
      "Drama club casting call.",
      "Counselor reminds everyone: plan your study hours early this month.",
      "Homecoming outfits trending—fashion bonuses stack this week!"
    ];
    const pick = notices[Math.floor(Math.random() * notices.length)];
    state.announcements.push(pick);
    log(`School Feed: ${pick}`, "ANNOUNCE", "success");
  }
}

function scheduleWeeklyTexts() {
  state.friendTextsRemaining = randomRange(3, 5);
  state.eventTextsRemaining = randomRange(1, 2);
  state.partnerTextsRemaining = state.partner ? randomRange(5, 7) : 0;
}

function handleNpcTexts() {
  const dailyFriendTexts = Math.min(state.friendTextsRemaining, Math.random() < 0.6 ? 1 : 0);
  const dailyEventTexts = Math.min(state.eventTextsRemaining, Math.random() < 0.4 ? 1 : 0);
  const dailyPartnerTexts = Math.min(state.partnerTextsRemaining, Math.random() < 0.75 ? 1 : 0);

  if (dailyFriendTexts) {
    state.friendTextsRemaining -= dailyFriendTexts;
    const friend = friends[Math.floor(Math.random() * friends.length)];
    friend.loyalty = Math.min(100, friend.loyalty + 1);
    log(`${friend.name} sends a check-in text. Staying connected helps loyalty.`, "TEXT", "success");
  }

  if (dailyEventTexts) {
    state.eventTextsRemaining -= dailyEventTexts;
    log("Group chat shares a hallway rumor. Keep your reputation steady!", "TEXT", "warn");
    adjustPopularity(randomRange(-2, 2), "chat ripple");
  }

  if (dailyPartnerTexts) {
    state.partnerTextsRemaining -= dailyPartnerTexts;
    if (state.partner) {
      state.romanceLevel = Math.min(100, state.romanceLevel + 1);
      log(`${state.partner} sends sweet texts. Relationship warms up.`, "ROMANCE", "success");
    }
  }
}

function triggerScheduledEvents(weekday) {
  state.events.forEach(evt => {
    if (evt.name === "Big Game" && weekday === "Fri" && state.week === 3) {
      adjustPopularity(4, "sports crowd");
      log("Week 3 Big Game hype boosts your athlete cred.", "EVENT", "success");
    }
    if (evt.name === "Grade Check" && state.week === 4 && weekday === "Sun") {
      const grade = gradeFromHours(state.studyHoursThisMonth);
      const allowance = allowanceFromGrade(grade);
      log(`Grade check: holding a ${grade}. Allowance projection: $${allowance}/week.`, "REPORT", "warn");
    }
    if (evt.name === "Homecoming" && state.week === 2 && weekday === "Sat") {
      const swing = state.fashionFreshness > 0 ? 6 : 2;
      adjustPopularity(swing, "Homecoming night");
      log("Homecoming crowns the well-dressed—fashion helps!", "EVENT", "success");
    }
    if (evt.name === "Prom" && state.week === 3 && weekday === "Sat") {
      const romanceBoost = state.partner ? 8 : 3;
      state.romanceLevel = Math.min(100, state.romanceLevel + romanceBoost);
      adjustPopularity(5, "Prom spotlight");
      unlockAchievement("Prom memories captured for the highlight reel.");
    }
    if (evt.name === "Midterms" && state.week === 3 && ["Wed", "Thu"].includes(weekday)) {
      const focusHours = Math.round(state.studyHoursThisMonth / 8);
      state.stress = Math.min(100, state.stress + 8);
      state.happiness = Math.max(0, state.happiness - 4);
      adjustResume(2, "midterms grit");
      log(`Midterms hit. Extra prep yields ${focusHours} bonus study points but stress rises.`, "MIDTERM", "warn");
    }
    if (evt.name === "Finals" && state.week === 4 && ["Fri", "Sat"].includes(weekday)) {
      const grade = gradeFromHours(state.studyHoursThisMonth);
      adjustPopularity(2, "finals grind");
      state.stress = Math.min(100, state.stress + 10);
      adjustResume(3, "finals resilience");
      log(`Finals crunch arrives. Holding a ${grade} while juggling stress.`, "FINALS", "warn");
    }
    if (evt.name === "Career Fair" && state.week === 2 && weekday === "Tue") {
      adjustResume(4, "career fair");
      state.leadershipCred = Math.min(100, state.leadershipCred + 2);
      state.passionMomentum = Math.min(100, state.passionMomentum + 4);
      log("Career fair connections supercharge your future track.", "CAREER", "success");
    }
    if (evt.name === "Field Trip" && state.week === 4 && weekday === "Thu") {
      state.happiness = Math.min(100, state.happiness + 8);
      state.energy = Math.min(100, state.energy + 6);
      log("Field trip day refreshes everyone—happiness surges.", "TRIP", "success");
    }
    if (evt.name === "Counselor Drop" && state.week === 1 && weekday === "Mon") {
      state.stress = Math.max(0, state.stress - 4);
      adjustResume(1, "counselor advice");
      log("Counselor drops by homeroom with scholarship tips and reassurance.", "COUNSEL", "success");
    }
  });
}

function adjustPopularity(amount, source) {
  const sportsMultiplier = state.sportsTier.includes("Varsity") ? 1.1 : 1;
  const fashionBonus = state.fashionFreshness > 0 ? 1.05 : 1;
  const netChange = Math.round(amount * sportsMultiplier * fashionBonus);

  const popularKids = Math.round(netChange * CLIQUE_WEIGHTS.popular);
  const athleteKids = Math.round(netChange * CLIQUE_WEIGHTS.athletes);
  const otherCliques = Math.round(netChange * CLIQUE_WEIGHTS.others);

  state.popularity = Math.min(100, Math.max(0, state.popularity + netChange));
  if (netChange > 0) {
    log(
      `Popularity +${Math.abs(netChange)} from ${source}. Breakdown: +${popularKids} popular kids, +${athleteKids} athletes, +${otherCliques} others. Current: ${state.popularity}.`,
      "POP",
      "success"
    );
  } else if (netChange < 0) {
    log(
      `Popularity -${Math.abs(netChange)} from ${source}. Breakdown: ${popularKids} popular kids, ${athleteKids} athletes, ${otherCliques} others. Current: ${state.popularity}.`,
      "POP",
      "danger"
    );
  }
  if (state.popularity > state.bestMomentPopularitySpike) {
    state.bestMomentPopularitySpike = state.popularity;
    unlockAchievement(`New popularity peak: ${state.popularity}!`);
  }
}

function unlockAchievement(text) {
  if (!state.achievements.includes(text)) {
    state.achievements.push(text);
    state.resumeStrength = Math.min(100, state.resumeStrength + 1);
    log(`Achievement unlocked: ${text}`, "ACHV", "success");
  }
}

function adjustResume(amount, reason) {
  const before = state.resumeStrength;
  state.resumeStrength = Math.min(100, state.resumeStrength + amount);
  if (state.resumeStrength > before && amount >= 2) {
    log(`Resume +${state.resumeStrength - before} via ${reason}.`, "RESUME", "success");
  }
}

function performAction(action) {
  if (
    state.punishment &&
    [
      "hangout",
      "club",
      "sports",
      "late-cram",
      "volunteer",
      "date-night",
      "best-friend",
      "creative",
      "fashion",
      "evening-walk",
      "family-dinner"
    ].includes(action)
  ) {
    log("Punishment in effect—you can't go out for this activity.", "PUNISH", "danger");
    return;
  }
  switch (action) {
    case "study":
      study(60, 1);
      break;
    case "study-sprint":
      study(120, 3);
      break;
    case "study-marathon":
      study(180, 4);
      state.happiness = Math.max(0, state.happiness - 6);
      log("You grind through a marathon study block. Exhausting but effective.", "STUDY", "warn");
      break;
    case "group-project":
      groupProject();
      break;
    case "hangout":
      hangout();
      break;
    case "best-friend":
      bestFriendTime();
      break;
    case "date-night":
      dateNight();
      break;
    case "text":
      sendTexts();
      break;
    case "rumor":
      startRumor();
      break;
    case "chore":
      doChore();
      break;
    case "job":
      partTimeJob();
      break;
    case "tutor":
      tutorSession();
      break;
    case "club":
      attendClub();
      break;
    case "lead":
      leadershipHuddle();
      break;
    case "sports":
      sportsPractice();
      break;
    case "fashion":
      upgradeOutfit();
      break;
    case "late-cram":
      lateNightCram();
      break;
    case "volunteer":
      volunteer();
      break;
    case "creative":
      creativePractice();
      break;
    case "stream":
      streamContent();
      break;
    case "power-nap":
      powerNap();
      break;
    case "evening-walk":
      eveningWalk();
      break;
    case "family-dinner":
      familyDinner();
      break;
    case "self-care":
      selfCareReset();
      break;
    case "skip":
      skipSchool();
      break;
    case "advance":
      advanceMinutes(MINUTES_PER_BLOCK);
      log("You take a breather while time advances.", "TIME", "warn");
      break;
    default:
      break;
  }
  render();
}

function study(durationMinutes, hourGain) {
  advanceMinutes(durationMinutes);
  state.studyHoursThisMonth += hourGain;
  state.happiness = Math.max(0, state.happiness - 2);
  log(`You study for ${durationMinutes / 60}h and add ${hourGain} study hour(s).`, "STUDY", "success");
}

function hangout() {
  const duration = 60;
  advanceMinutes(duration);
  const friend = friends[Math.floor(Math.random() * friends.length)];
  friend.loyalty = Math.min(100, friend.loyalty + 4);
  state.happiness = Math.min(100, state.happiness + 4);
  adjustPopularity(2, `${friend.name}'s circle`);
  log(`You hang out with ${friend.name}. Loyalty rises and word spreads.`, "HANGOUT", "success");
}

function sendTexts() {
  const duration = 30;
  advanceMinutes(duration);
  const texts = Math.floor(Math.random() * 3) + 3; // 3-5 texts
  state.textCountWeek = Math.min(7, state.textCountWeek + 1);
  const friend = friends[Math.floor(Math.random() * friends.length)];
  friend.loyalty = Math.min(100, friend.loyalty + 2);
  if (state.partner) {
    state.romanceLevel = Math.min(100, state.romanceLevel + 1.5);
  }
  adjustPopularity(1, "texts");
  log(`You send ${texts} texts and keep ${friend.name} in the loop.`, "TEXT", "success");
}

function startRumor() {
  const duration = 30;
  advanceMinutes(duration);
  const severities = [
    { label: "Everyday", range: [5, 10] },
    { label: "Medium", range: [10, 15] },
    { label: "Rare heavy-lite", range: [15, 18] }
  ];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  const change = severity.range[0] + Math.random() * (severity.range[1] - severity.range[0]);
  const positive = Math.random() > 0.5 ? 1 : -1;
  adjustPopularity(positive * Math.round(change), `rumor (${severity.label})`);
  friends.forEach(f => (f.loyalty = Math.max(0, f.loyalty - 1)));
  log(`Rumor (${severity.label}) ripples across cliques. Loyalty dips slightly.`, "RUMOR", positive > 0 ? "success" : "danger");
}

function doChore() {
  const tiers = [
    { name: "Tier 1", duration: [15, 30], pay: [1, 3] },
    { name: "Tier 2", duration: [30, 45], pay: [4, 6] },
    { name: "Tier 3", duration: [60, 90], pay: [7, 10] }
  ];
  const tier = tiers[Math.floor(Math.random() * tiers.length)];
  const duration = randomRange(tier.duration[0], tier.duration[1]);
  const pay = randomRange(tier.pay[0], tier.pay[1]);
  advanceMinutes(duration);
  state.money += pay;
  state.happiness = Math.max(0, state.happiness - 1);
  log(`You complete a ${tier.name} chore in ${duration} minutes and earn $${pay}.`, "CHORE", "success");
}

function partTimeJob() {
  const duration = 45;
  advanceMinutes(duration);
  const pay = randomRange(6, 12);
  state.money += pay;
  state.happiness = Math.max(0, state.happiness - 2);
  adjustPopularity(-1, "less free time");
  log(`You pick up a quick shift and earn $${pay}, but miss some hallway chatter.`, "JOB", "warn");
}

function attendClub() {
  const duration = 60;
  advanceMinutes(duration);
  state.happiness = Math.min(100, state.happiness + 3);
  adjustPopularity(2, "club meet");
  const friend = friends[Math.floor(Math.random() * friends.length)];
  friend.loyalty = Math.min(100, friend.loyalty + 3);
  if (!state.clubLeadership && Math.random() < 0.15) {
    state.clubLeadership = true;
    unlockAchievement("Club officer elected! Leadership unlocked.");
  }
  log(`You attend a club meeting. ${friend.name} appreciates the commitment.`, "CLUB", "success");
}

function sportsPractice() {
  const duration = 60;
  advanceMinutes(duration);
  state.athleticism = Math.min(10, state.athleticism + 0.3);
  adjustPopularity(3, "sports");
  updateSportsTier();
  log("You push through intense practice. Athleticism and popularity climb.", "SPORTS", "success");
}

function updateSportsTier() {
  if (state.athleticism >= 6 && state.popularity >= 60) {
    state.sportsTier = "Varsity Captain";
    unlockAchievement("Varsity Captain secured!");
  } else if (state.athleticism >= 6) {
    state.sportsTier = "Varsity";
  } else if (state.athleticism >= 4) {
    state.sportsTier = "JV";
  } else {
    state.sportsTier = "None";
  }
}

function upgradeOutfit() {
  const duration = 15;
  const cost = 5;
  if (state.money < cost) {
    log("Not enough money to refresh your look.", "FASHION", "danger");
    return;
  }
  advanceMinutes(duration);
  state.money -= cost;
  state.fashionFreshness = 28;
  adjustPopularity(4, "fresh outfit");
  log("New outfit acquired. Popularity boosted for four weeks of slow decay.", "FASHION", "success");
}

function lateNightCram() {
  const duration = 90;
  const startHour = Math.floor(state.minuteOfDay / 60);
  advanceMinutes(duration);
  state.studyHoursThisMonth += 2;
  state.happiness = Math.max(0, state.happiness - 4);
  if (startHour >= 21) {
    state.punishment = { reason: "Stayed out late", duration: 3 };
    log("Parents noticed the late-night study—temporary punishment applied.", "CURFEW", "danger");
  }
  log("You cram deep into the night, squeezing out extra study hours.", "CRAM", "warn");
}

function volunteer() {
  const duration = 60;
  advanceMinutes(duration);
  state.happiness = Math.min(100, state.happiness + 5);
  adjustPopularity(2, "community points");
  if (Math.random() < 0.25) {
    unlockAchievement("Volunteer hero—teachers notice your kindness.");
  }
  adjustResume(2, "volunteer service");
  log("You volunteer at a local event. Teachers and peers take note.", "VOL", "success");
}

function groupProject() {
  const duration = 120;
  advanceMinutes(duration);
  state.studyHoursThisMonth += 3;
  state.stress = Math.min(100, state.stress + 4);
  const teammate = friends[Math.floor(Math.random() * friends.length)];
  teammate.loyalty = Math.min(100, teammate.loyalty + 3);
  adjustResume(3, "group project");
  log(`You grind a group project with ${teammate.name}. Grades and resume get a bump.`, "PROJECT", "success");
}

function tutorSession() {
  const duration = 50;
  advanceMinutes(duration);
  const pay = randomRange(6, 9);
  state.money += pay;
  state.studyHoursThisMonth += 1;
  state.leadershipCred = Math.min(100, state.leadershipCred + 2);
  adjustResume(2, "peer tutoring");
  state.stress = Math.min(100, state.stress + 2);
  log(`You tutor a classmate for $${pay}. Leadership and resume rise.`, "TUTOR", "success");
}

function leadershipHuddle() {
  const duration = 45;
  advanceMinutes(duration);
  state.leadershipCred = Math.min(100, state.leadershipCred + 3);
  adjustResume(1, "leadership meeting");
  state.happiness = Math.min(100, state.happiness + 3);
  state.stress = Math.max(0, state.stress - 2);
  adjustPopularity(2, "leadership");
  log("You facilitate a leadership huddle. People notice your initiative.", "LEAD", "success");
}

function streamContent() {
  const duration = 40;
  advanceMinutes(duration);
  const gain = randomRange(20, 60);
  state.followers += gain;
  adjustPopularity(2, "stream hype");
  state.passionMomentum = Math.min(100, state.passionMomentum + 6);
  state.money += 1;
  state.stress = Math.min(100, state.stress + 1);
  log(`You stream a quick session and gain ${gain} followers.`, "STREAM", "success");
}

function powerNap() {
  const duration = 30;
  advanceMinutes(duration);
  state.energy = Math.min(100, state.energy + 18);
  state.stress = Math.max(0, state.stress - 6);
  state.sleepDebt = Math.max(0, state.sleepDebt - 0.5);
  state.restfulToday = true;
  log("You crash for a power nap and wake up sharper.", "REST", "success");
}

function eveningWalk() {
  const duration = 45;
  advanceMinutes(duration);
  state.energy = Math.min(100, state.energy + 8);
  state.happiness = Math.min(100, state.happiness + 4);
  state.stress = Math.max(0, state.stress - 10);
  state.restfulToday = true;
  adjustPopularity(1, "neighborhood sighting");
  log("Evening walk clears your head and rumors swirl of your glow-up.", "WELL", "success");
}

function familyDinner() {
  const duration = 60;
  advanceMinutes(duration);
  state.energy = Math.min(100, state.energy + 12);
  state.happiness = Math.min(100, state.happiness + 6);
  state.stress = Math.max(0, state.stress - 8);
  state.restfulToday = true;
  if (state.punishment) {
    state.punishment.duration = Math.max(0, state.punishment.duration - 1);
  }
  log("Family dinner soothes nerves and resets expectations.", "HOME", "success");
}

function selfCareReset() {
  const duration = 35;
  advanceMinutes(duration);
  state.stress = Math.max(0, state.stress - 12);
  state.energy = Math.min(100, state.energy + 5);
  state.happiness = Math.min(100, state.happiness + 5);
  state.passionMomentum = Math.min(100, state.passionMomentum + 2);
  state.restfulToday = true;
  unlockAchievement("Grounded day: self-care first.");
  log("You journal, stretch, hydrate—self-care reset lowers burnout risk.", "WELL", "success");
}

function bestFriendTime() {
  const duration = 75;
  advanceMinutes(duration);
  const bestie = friends.find(f => f.tier === "Best Friend") || friends[0];
  bestie.loyalty = Math.min(100, bestie.loyalty + 6);
  state.happiness = Math.min(100, state.happiness + 6);
  adjustPopularity(3, `${bestie.name}'s inner circle`);
  log(`Deep hang with ${bestie.name}. Loyalty cements and cliques notice.`, "BFF", "success");
}

function dateNight() {
  const duration = 90;
  if (!state.partner) {
    log("You need a partner to plan a date night.", "ROMANCE", "danger");
    return;
  }
  advanceMinutes(duration);
  state.romanceLevel = Math.min(100, state.romanceLevel + 8);
  state.happiness = Math.min(100, state.happiness + 5);
  adjustPopularity(4, "date night story");
  log(`You and ${state.partner} enjoy a big night out. Relationship soars.`, "DATE", "success");
}

function creativePractice() {
  const duration = 45;
  advanceMinutes(duration);
  state.happiness = Math.min(100, state.happiness + 4);
  adjustPopularity(2, "creative flex");
  if (Math.random() < 0.2) {
    unlockAchievement("Talent show buzz—your creative side trends.");
  }
  log("You practice music/art/video editing—students share your work.", "CREATIVE", "success");
}

function skipSchool() {
  const totalDayMinutes = 24 * 60 - state.minuteOfDay;
  advanceMinutes(totalDayMinutes);
  state.happiness = Math.min(100, state.happiness + 6);
  adjustPopularity(3, "rebels");
  const consequence = Math.random();
  if (consequence < 0.5) {
    log("Caught skipping! Saturday detention assigned.", "DETENTION", "danger");
  } else {
    state.punishment = { reason: "Skipped school", duration: 7 };
    log("Parents found out. No allowance and forced chores for a week.", "PUNISH", "danger");
  }
}

function scheduleEventsForMonth(monthName) {
  const events = [];
  events.push({ name: "Club Expo", timing: "Week 1", effect: "+popularity if you attend clubs" });
  events.push({ name: "Big Game", timing: "Week 3 Friday", effect: "+popularity from sports" });
  events.push({ name: "Grade Check", timing: "Week 4", effect: "Allowance and curfew adjust" });
  events.push({ name: "Counselor Drop", timing: "Week 1", effect: "Stress pulses and scholarship tips" });
  if (["Oct", "Nov"].includes(monthName)) {
    events.push({ name: "Homecoming", timing: "Week 2 Saturday", effect: "Fashion boosts matter more" });
  }
  if (["Apr", "May"].includes(monthName)) {
    events.push({ name: "Prom", timing: "Week 3 Saturday", effect: "Outfits + romance" });
  }
  if (["Nov", "Mar"].includes(monthName)) {
    events.push({ name: "Midterms", timing: "Week 3", effect: "Grades & stress" });
  }
  if (["Dec", "Jun"].includes(monthName)) {
    events.push({ name: "Finals", timing: "Week 4", effect: "Grades & burnout" });
  }
  if (["Jan", "Feb"].includes(monthName)) {
    events.push({ name: "Career Fair", timing: "Week 2", effect: "Resume + leadership" });
  }
  if (["Apr"].includes(monthName)) {
    events.push({ name: "Field Trip", timing: "Week 4", effect: "Happiness boost" });
  }
  return events;
}

function evaluateYearEnd() {
  const recentGrades = state.gradeHistory.slice(0, 10);
  const avgGradePoints =
    recentGrades.reduce((sum, card) => sum + gradeToPoints(card.grade), 0) / Math.max(1, recentGrades.length);

  const friendAvg = friends.reduce((sum, f) => sum + f.loyalty, 0) / friends.length;
  const romanceBonus = state.partner ? state.romanceLevel : 0;
  const moneyBonus = Math.min(20, state.money) * 1.5;
  const happinessBonus = state.happiness * 0.2;
  const popularityBonus = state.popularity * 0.35;
  const futureTrack = state.resumeStrength * 0.2 + state.leadershipCred * 0.15 + state.scholarshipOdds * 0.25;
  const passionBonus = Math.min(20, state.passionMomentum * 0.2 + state.followers * 0.04);

  const rawScore =
    avgGradePoints * 0.15 +
    friendAvg * 0.1 +
    romanceBonus * 0.1 +
    moneyBonus +
    happinessBonus +
    popularityBonus +
    futureTrack +
    passionBonus;
  state.finalScore = Math.min(100, Math.round(rawScore));

  const highlight = `Year ${state.year} highlight reel — Peak popularity ${state.bestMomentPopularitySpike}, bestie loyalty ${friendAvg.toFixed(
    0
  )}, romance ${state.partner ? "sparked" : "pending"}, score ${state.finalScore}.`;
  state.yearHighlights.unshift(highlight);
  log(highlight, "REEL", "success");
  if (state.year === 4) {
    log("Graduation: final scoreboard tallied. Replay to chase a new arc!", "GRAD", "success");
  }
  state.bestMomentPopularitySpike = state.popularity;
}

function randomRange(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

actions.forEach(button => {
  button.addEventListener("click", () => performAction(button.dataset.action));
});

state.events = scheduleEventsForMonth(MONTHS[state.monthIndex]);
scheduleWeeklyTexts();
log("You arrive for freshman year—popularity is low but hope is high.", "INTRO", "warn");
render();
