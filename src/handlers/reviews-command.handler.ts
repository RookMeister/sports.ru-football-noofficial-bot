import { Context } from 'telegraf';
import { UTCDate } from '@bot/helpers/transform-date';
import { ReviewsModel } from '@bot/models/reviews.model';
import { inlineKeyboard } from '@bot/helpers/keyboards';
import { reviewsUpdate } from '@bot/helpers/buttons.json';

export const reviewsCommandHandler = async (ctx: Context, update = false) => {
  const { size, column, values } = reviewsUpdate;
  const keyboard = inlineKeyboard(values, size, column);
  const stringDate = UTCDate(true);
  const reviews = await ReviewsModel.findReviewToday(stringDate);
  let string = `\r\n<b><i>Обзоры матчей за ${stringDate}</i></b>\r\n\r\n`
  if (reviews.length) {
    reviews.forEach((r, i) => {
      string += `${i+1}. <a href="${r.url}">${r.title}</a>\r\n`
    });
  } else {
    string += 'Нет обзоров матчей';
  }
  if (update) {
    return await ctx.editMessageText(string, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard }).catch((err) => ctx.answerCbQuery('Уже выведено'));
  } else {
    return await ctx.replyWithHTML(string, { disable_web_page_preview: true, parse_mode: 'HTML', ...keyboard });
  }
};
