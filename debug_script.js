import { startOfWeek, addDays, format, subDays } from 'date-fns';

function testDate(testDateStr) {
  const todayDate = new Date(testDateStr);
  const referenceDate = subDays(todayDate, 1);
  const mostRecentTuesday = startOfWeek(referenceDate, { weekStartsOn: 2 });
  const nextMonday = addDays(mostRecentTuesday, 6);
  const queryStartDate = format(mostRecentTuesday, "yyyy-MM-dd");
  const queryEndDate = format(addDays(nextMonday, 1), "yyyy-MM-dd");
  console.log(`Run date: ${testDateStr} -> Query: ${queryStartDate} to ${queryEndDate}`);
}

testDate("2026-03-15T12:00:00Z"); // Sunday
testDate("2026-03-16T12:00:00Z"); // Monday
testDate("2026-03-17T12:00:00Z"); // Tuesday
testDate("2026-03-18T12:00:00Z"); // Wednesday
testDate("2026-03-19T12:00:00Z"); // Thursday
