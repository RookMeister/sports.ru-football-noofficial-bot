import { Context, deunionize } from 'telegraf';
import ISO6391 from 'iso-639-1';
import { selectData } from '@bot/helpers/callback-data';
import { inlineKeyboard } from '@bot/helpers/keyboards';

export const languageCommandHandler = async (ctx: Context) => {
  const locales = Object.keys(ctx.i18n.repository);
  const currentLocale = ctx.i18n.locale();
  const buttons = locales.map(code => {
    const button = {
      label: `${(currentLocale === code) ? '✅ ' : ''}${ISO6391.getNativeName(code)}`,
      value: selectData('select-language').create({ code })
    };
    return button;
  })
  const keyboard = inlineKeyboard(buttons);
  await ctx.reply(ctx.i18n.t('language_select'), { ...keyboard });
};

export const languageMenuSelectHandler = async (ctx: Context) => {
  const { code } = selectData('select-language').parse(deunionize(ctx.callbackQuery).data);

  if (Object.keys(ctx.i18n.repository).includes(code)) {
    ctx.dbuser.language = code;
    ctx.dbuser = await ctx.dbuser.save();
    ctx.i18n.locale(code);
    ctx.deleteMessage();
    // const keyboard = mainMenuKeyboard(ctx.i18n.locale());
    // ctx.editMessageText(ctx.i18n.t('language_selected'), { ...inlineKeyboard });
    ctx.reply(ctx.i18n.t('language_selected'));
  }
};
