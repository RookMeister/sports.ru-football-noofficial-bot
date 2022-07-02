import { Context } from 'telegraf';
import { StatModel } from '@bot/models/analytics.model';
import { UTCToday } from '@helpers/transform-date';

export const analyticsMiddleware = async (ctx: Context, next: () => void) => {
  await StatModel.countUpStat(UTCToday(), 'all');
  return next();
};