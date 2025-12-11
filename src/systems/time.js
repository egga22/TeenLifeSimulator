import { TIME_BLOCK_MINUTES } from "../constants.js";

export function blocksBetween(startMinutes, endMinutes) {
  if (endMinutes <= startMinutes) return 0;
  const duration = endMinutes - startMinutes;
  return Math.ceil(duration / TIME_BLOCK_MINUTES);
}

export function minutesFromClock(clockTime) {
  const [hours, minutes] = clockTime.split(":").map(Number);
  return hours * 60 + minutes;
}

export function clockFromMinutes(minutes) {
  const hrs = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hrs}:${mins}`;
}
