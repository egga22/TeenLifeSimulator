import { ALLOWANCE_BY_GRADE, GRADE_THRESHOLDS } from "../constants.js";

export function gradeFromStudyHours(hours) {
  const safeHours = Math.max(0, hours);
  const threshold = GRADE_THRESHOLDS.find(({ min }) => safeHours >= min);
  return threshold ? threshold.grade : "F";
}

export function allowanceForGrade(grade) {
  return ALLOWANCE_BY_GRADE[grade] ?? 0;
}

export function teacherCommentForGrade(grade) {
  const strong = ["A+", "A", "A-"];
  const good = ["B+", "B", "B-"];
  const average = ["C+", "C", "C-"];

  if (strong.includes(grade)) {
    return "Outstanding focus and consistency.";
  }
  if (good.includes(grade)) {
    return "Solid work with room to stretch further.";
  }
  if (average.includes(grade)) {
    return "Steady progress—seek extra help on tough units.";
  }
  return "Needs significant improvement—prioritize study hours.";
}

export function semesterReportCard(monthlyHours) {
  const monthly = monthlyHours.map((hours) => ({
    hours,
    grade: gradeFromStudyHours(hours)
  }));

  const semesterHours = monthly.reduce((sum, { hours }) => sum + hours, 0);
  const averageHours = monthly.length ? semesterHours / monthly.length : 0;
  const semesterGrade = gradeFromStudyHours(averageHours);

  return {
    monthly,
    semester: {
      grade: semesterGrade,
      averageHours
    },
    teacherComment: teacherCommentForGrade(semesterGrade)
  };
}
