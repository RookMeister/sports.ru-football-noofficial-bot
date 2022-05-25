import { Context } from 'telegraf';

export async function setLastActionToUserMiddleware(ctx: Context, next: () => void) {
  ctx.dbuser.updatedAt = new Date();
  ctx.dbuser = await ctx.dbuser.save();
  return next()
}
