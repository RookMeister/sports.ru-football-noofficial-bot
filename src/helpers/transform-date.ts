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
    today: UTCToday(),
    yesterday: UTCYesterday(),
    tomorrow: UTCTomorrow()
  }
  return date[day];
}

export const UTCToday = () => {
  return formatISO(new Date(), { representation: 'date' });;
}

export const UTCTomorrow = () => {
  const today = new Date();
  today.setUTCDate(today.getUTCDate() + 1);
  return formatISO(today, { representation: 'date' });
}

export const UTCYesterday = () => {
  const today = new Date();
  today.setUTCDate(today.getUTCDate() - 1);
  return formatISO(today, { representation: 'date' });;
}