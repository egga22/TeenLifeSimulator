export const TIME_BLOCK_MINUTES = 15;
export const SCHOOL_START = "08:00";
export const SCHOOL_END = "15:00";
export const BIKE_COMMUTE_MORNING = { start: "07:30", end: "08:00" };
export const BIKE_COMMUTE_AFTERNOON = { start: "15:00", end: "15:30" };

export const GRADE_THRESHOLDS = [
  { min: 50, grade: "A+" },
  { min: 45, grade: "A" },
  { min: 40, grade: "A-" },
  { min: 35, grade: "B+" },
  { min: 30, grade: "B" },
  { min: 25, grade: "B-" },
  { min: 20, grade: "C+" },
  { min: 15, grade: "C" },
  { min: 10, grade: "C-" }
];

export const ALLOWANCE_BY_GRADE = {
  "A+": 15,
  A: 15,
  "A-": 15,
  "B+": 10,
  B: 10,
  "B-": 10,
  "C+": 5,
  C: 5,
  "C-": 5,
  F: 0
};

export const CHORE_TIERS = {
  1: { durationRange: [15, 30], payRange: [1, 3] },
  2: { durationRange: [30, 45], payRange: [4, 6] },
  3: { durationRange: [60, 90], payRange: [7, 10] }
};

export const FRIENDSHIP_DECAY_DAYS = {
  friend: 5,
  bestFriend: 10,
  partner: 3
};

export const RUMOR_SEVERITY = {
  everyday: { deltaRange: [5, 10] },
  medium: { deltaRange: [10, 15] },
  heavyLite: { deltaRange: [15, 18] }
};

export const CLIQUE_WEIGHTING = {
  popular: 0.7,
  athletes: 0.2,
  others: 0.1
};
