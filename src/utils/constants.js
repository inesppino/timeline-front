import { getRange } from "./helpers";

export const UNIT_FORMATS = {
  hour: "HH:mm",
  minute: "mm",
  day: "eee dd",
};

export const DEFAULT_RANGE = getRange(new Date());

export const DEFAULT_UNIT = {
  name: "hour",
  format: UNIT_FORMATS.hour,
};
