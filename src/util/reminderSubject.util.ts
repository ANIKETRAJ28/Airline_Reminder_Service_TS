export function ReminderSubject(flight_number: string, date: string): string {
  return `Reminder: Your Upcoming Flight with SkyWings Airlines - ${flight_number} on ${new Date(date).toISOString().slice(11, 16)}, ${new Date(
    date,
  ).toLocaleDateString([], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}`;
}
