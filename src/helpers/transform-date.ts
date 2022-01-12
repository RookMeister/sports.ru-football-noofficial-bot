import { formatISO } from 'date-fns';

export const setTime = (timeZone: string, date: string) => {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const diff = Number(timeZone) - 3;
  newDate.setHours(hours + diff);
  return newDate.toLocaleString('ru', { day: "numeric", month: "numeric", hour: "numeric", minute: "numeric" });
}

export const UTCDate = (prev = false) => {
  const today = new Date();
  if (prev) {
    today.setUTCDate(today.getUTCDate() - 1);
  }
  const date = formatISO(today, { representation: 'date' });
  return date;
}