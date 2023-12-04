export function calculateDateDifference(scheduleDate: string | number | Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const schedule = new Date(scheduleDate);
  schedule.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(schedule.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
