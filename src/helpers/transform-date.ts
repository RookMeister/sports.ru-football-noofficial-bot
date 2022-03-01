import { formatISO } from 'date-fns';

export const setTime = (timeZone: string, date: string) => {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const diff = Number(timeZone) - 3;
  newDate.setHours(hours + diff);
  return newDate.toLocaleString('ru', { day: "numeric", month: "numeric", hour: "numeric", minute: "numeric" });
}

export const UTCDate = () => {
  const today = new Date();
  const date = formatISO(today, { representation: 'date' });
  return date;
}

export const UTCNext1Day = () => {
  const today = new Date();
  today.setUTCDate(today.getUTCDate() + 1);
  const date = formatISO(today, { representation: 'date' });
  return date;
}

export const UTCPrev1Day = () => {
  const today = new Date();
  today.setUTCDate(today.getUTCDate() - 1);
  const date = formatISO(today, { representation: 'date' });
  return date;
}

export const UTCPrev12Hours = () => {
  const today = new Date();
  today.setHours(today.getUTCHours() - 12);
  const date = formatISO(today, { representation: 'date' });
  return date;
}