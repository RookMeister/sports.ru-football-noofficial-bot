import { Context } from 'telegraf';
import { DocumentType } from '@typegoose/typegoose';
import { User, UserModel } from '@bot/models/user.model';
import changelog from '@bot/changelog.json';

export const sendChangelogCommandHandler = async (ctx: Context) => {
  if (ctx.from.id === 302423620) {
    const usersData = await UserModel.findAllUsers();
    for (let [i, user] of usersData.entries()) {
      let info = '<b>Новые изменения:</b>\r\n';
      info += changelog[0].text;
      if (!user.status) {
        await UserModel.saveStatusUser({ id: user.chat_id, status: 'ok' });
      }
      (user.status === 'ok') && await sendMessage(ctx, user, info);
    }
  } else {
    await ctx.reply('Извини, я не могу тебя понять. Используй кнопки. Если не видишь кнопки, отправь мне /start');
  }
};

const timeoutPromise = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

async function sendMessage(ctx: Context, user: DocumentType<User>, info: string) {
  try {
    await timeoutPromise(3000);
    const options: { disable_web_page_preview: boolean; parse_mode: 'HTML'; } = {
      disable_web_page_preview: true,
      parse_mode: 'HTML',
    };
    let errorText = '';
    await ctx.telegram.sendMessage(user.chat_id, info, options).catch(error => {
      errorText = error.message;
    });
    if (errorText === '400: Bad Request: chat not found') {
      (user.status === 'ok') && await UserModel.saveStatusUser({ id: user.chat_id, status: 'notFound' });
    } else if (errorText === '403: Forbidden: bot was blocked by the user') {
      (user.status === 'ok') && await UserModel.saveStatusUser({ id: user.chat_id, status: 'blocked' });
    }
  } catch (e) {
    console.error('sendMessage', e);
  }
}