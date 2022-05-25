import { Context } from 'telegraf';
import { StatModel } from '~/apps/bot/src/models/analytics.model';
import { UTCDate } from '~/apps/bot/src/helpers/transform-date';

export const analyticsMiddleware = async (ctx: Context, next) => {
  const date = UTCDate();
  await StatModel.countUpStat({ date, view: 'all' })
  return next();
};