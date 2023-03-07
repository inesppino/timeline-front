import { subHours } from "date-fns";
import { getRandomColor } from "../utils/helpers";

const mockData = {
  ANA: {
    color: `rgba(${getRandomColor()},${getRandomColor()},${getRandomColor()}`,
    data: [
      { x: subHours(new Date(), 3), y: 7 },
      { x: subHours(new Date(), 2), y: 2 },
      { x: subHours(new Date(), 1), y: 5 },
      { x: new Date(), y: 5 },
    ],
  },

  DAVID: {
    color: `rgba(${getRandomColor()},${getRandomColor()},${getRandomColor()}`,
    data: [
      { x: subHours(new Date(), 5), y: 1 },
      { x: subHours(new Date(), 2), y: 5 },
      { x: subHours(new Date(), 2), y: 9 },
      { x: new Date(), y: 8 },
    ],
  },
};

export default mockData;
