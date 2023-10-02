import { differenceInDays } from "date-fns";

export const countDaysFromStartToEndDates = (
  startDate: Date,
  endDate: Date
): number => {
  //must add 1 day, differenceInDays is returning 0 for startDate = 17.10 and endDate = 18.10
  return Number(differenceInDays(endDate, startDate)) + 1;
};
