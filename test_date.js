import { format, addDays, startOfWeek } from 'date-fns';

const todayDate = new Date();
const mostRecentTuesday = startOfWeek(todayDate, { weekStartsOn: 2 });
const nextMonday = addDays(mostRecentTuesday, 6);
const queryStartDate = format(mostRecentTuesday, "yyyy-MM-dd");
const queryEndDate = format(addDays(nextMonday, 1), "yyyy-MM-dd");

console.log("Today:", todayDate.toDateString());
console.log("Most recent Tuesday:", mostRecentTuesday.toDateString());
console.log("Next Monday:", nextMonday.toDateString());
console.log("Query Start Date:", queryStartDate);
console.log("Query End Date:", queryEndDate);
