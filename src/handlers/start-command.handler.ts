import { Context } from 'telegraf';

export const startCommandHandler = async (ctx: Context) => {
  const { username } = ctx.dbuser;
  await ctx.reply(ctx.i18n.t('start', { username }));
};
