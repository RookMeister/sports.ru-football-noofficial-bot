import { Context } from 'telegraf';
import { StatModel } from '@bot/models/analytics.model';
import { UTCDate } from '@bot/helpers/transform-date';

export const analyticsMiddleware = async (ctx: Context, next: () => void) => {
  const date = UTCDate();
  await StatModel.countUpStat(date, 'all');
  return next();
};