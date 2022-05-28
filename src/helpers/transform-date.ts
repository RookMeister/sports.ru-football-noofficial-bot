import { formatISO } from 'date-fns';

export const setTime = (timeZone: string, date: string) => {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const diff = Number(timeZone) - 3;
  newDate.setHours(hours + diff);
  return newDate.toLocaleString('ru', { day: "numeric", month: "numeric", hour: "numeric", minute: "numeric" });
}

type TDay = 'today' | 'yesterday' | 'tomorrow';

export const UTCDate = (day: TDay = 'today') => {
  const date = {
    today: UTCToDay(),
    yesterday: UTCPrev1Day(),
    tomorrow: UTCNext1Day()
  }
  return date[day];
}

export const UTCToDay = () => {
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