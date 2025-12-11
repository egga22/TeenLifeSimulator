const GRADE_THRESHOLDS = [
  { min: 50, letter: 'A+' },
  { min: 45, letter: 'A' },
  { min: 40, letter: 'A-' },
  { min: 35, letter: 'B+' },
  { min: 30, letter: 'B' },
  { min: 25, letter: 'B-' },
  { min: 20, letter: 'C+' },
  { min: 15, letter: 'C' },
  { min: 10, letter: 'C-' },
  { min: 0, letter: 'F' }
];

export function getGradeFromStudyHours(hours) {
  if (hours < 0) throw new Error('Study hours cannot be negative');
  const match = GRADE_THRESHOLDS.find(({ min }) => hours >= min);
  return match?.letter ?? 'F';
}

export function getCurfewFromGrade(letter, isWeekend = false) {
  const normalized = letter.toUpperCase();
  switch (normalized) {
    case 'A+':
    case 'A':
    case 'A-':
      return isWeekend ? '12:00 AM' : '11:00 PM';
    case 'B+':
    case 'B':
    case 'B-':
      return isWeekend ? '11:00 PM' : '10:00 PM';
    case 'C+':
    case 'C':
    case 'C-':
      return isWeekend ? '10:00 PM' : '9:00 PM';
    default:
      return isWeekend ? '9:00 PM' : '8:00 PM';
  }
}

export function getAllowanceFromGrade(letter) {
  const normalized = letter.toUpperCase();
  if (['A+', 'A', 'A-'].includes(normalized)) return 15;
  if (['B+', 'B', 'B-'].includes(normalized)) return 10;
  if (['C+', 'C', 'C-'].includes(normalized)) return 5;
  return 0;
}

export const GRADE_THRESHOLDS_CONFIG = GRADE_THRESHOLDS;
