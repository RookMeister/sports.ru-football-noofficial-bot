import { DocumentType } from '@typegoose/typegoose';
import { User, UserModel } from '@bot/models/user.model';
import { Context } from 'telegraf';

declare module 'telegraf' {
  interface Context {
    dbuser: DocumentType<User>;
  }
}

export async function attachUserMiddleware(ctx: Context, next: () => void) {
  const username = ctx.from.username || ctx.from.first_name || null;
  ctx.dbuser = await UserModel.findUserOrSave({ id: ctx.from.id, username });
  return next()
}
