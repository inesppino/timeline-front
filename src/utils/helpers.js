import {
  addDays,
  addHours,
  addMinutes,
  startOfHour,
  subDays,
  subHours,
  subMinutes,
} from "date-fns";

export const getRandomColor = () => {
  return Math.floor(Math.random() * 255);
};

export const rangeByUnit = {
  minute: {
    min: (date) => subMinutes(date, 120),
    max: (date) => addMinutes(date, 10),
  },
  hour: { min: (date) => subHours(date, 12), max: (date) => addHours(date, 1) },
  day: { min: (date) => subDays(date, 6), max: (date) => addDays(date, 1) },
};

export const getRange = (date, unit = "hour") => {
  const nearestOclock = startOfHour(date);
  const min = rangeByUnit[unit].min(nearestOclock);
  const max = rangeByUnit[unit].max(nearestOclock);
  return { min, max };
};
