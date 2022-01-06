export const setTime = (timeZone: string, date: string) => {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const diff = Number(timeZone) - 3;
  newDate.setHours(hours + diff);
  return newDate.toLocaleString('ru', { day: "numeric", month: "numeric", hour: "numeric", minute: "numeric" });
}