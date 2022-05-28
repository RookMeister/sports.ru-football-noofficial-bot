import { DocumentType } from '@typegoose/typegoose';
import { User, UserModel } from '@bot/models/user.model';
import { Context } from 'telegraf';

declare module 'telegraf' {
  interface Context {
    dbuser: DocumentType<User>;
  }
}

export async function attachUserMiddleware(ctx: Context, next: () => void) {
  if (ctx.from) {
    const username = ctx.from.username || ctx.from.first_name || 'unknow_user';
    ctx.dbuser = await UserModel.findUserOrSave(ctx.from.id, username);
  }
  return next()
}
