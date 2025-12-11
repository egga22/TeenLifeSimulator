const SCHOOL_START = { hour: 8, minute: 0 };
const SCHOOL_END = { hour: 15, minute: 0 };
const COMMUTE_DURATION = 30; // minutes
const BLOCK_SIZE = 15;

function formatTime(hours, minutes) {
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const adjustedHour = ((hours + 11) % 12) + 1;
  const paddedMinutes = minutes.toString().padStart(2, '0');
  return `${adjustedHour}:${paddedMinutes} ${suffix}`;
}

export class TimeSystem {
  constructor(startDay = 1, startHour = 7, startMinute = 0) {
    this.day = startDay;
    this.hour = startHour;
    this.minute = startMinute;
  }

  get timeLabel() {
    return formatTime(this.hour, this.minute);
  }

  get isDuringSchool() {
    const currentTotal = this.hour * 60 + this.minute;
    const startTotal = SCHOOL_START.hour * 60 + SCHOOL_START.minute;
    const endTotal = SCHOOL_END.hour * 60 + SCHOOL_END.minute;
    return currentTotal >= startTotal && currentTotal < endTotal;
  }

  get commuteWindow() {
    return {
      morning: {
        start: formatTime(7, 30),
        end: formatTime(8, 0)
      },
      afternoon: {
        start: formatTime(15, 0),
        end: formatTime(15, 30)
      }
    };
  }

  advance(minutes) {
    if (minutes % BLOCK_SIZE !== 0) {
      throw new Error('Time advances must align to 15-minute blocks.');
    }

    let total = this.hour * 60 + this.minute + minutes;
    this.day += Math.floor(total / (24 * 60));
    total %= 24 * 60;
    this.hour = Math.floor(total / 60);
    this.minute = total % 60;
    return this.timeLabel;
  }
}

export const SCHOOL_SCHEDULE = {
  schoolStart: formatTime(SCHOOL_START.hour, SCHOOL_START.minute),
  schoolEnd: formatTime(SCHOOL_END.hour, SCHOOL_END.minute),
  bikeCommute: {
    morning: '7:30 AM – 8:00 AM',
    afternoon: '3:00 PM – 3:30 PM',
    durationMinutes: COMMUTE_DURATION
  },
  blockSizeMinutes: BLOCK_SIZE
};
