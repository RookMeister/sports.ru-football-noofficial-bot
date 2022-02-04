import { Context } from 'telegraf';
import { UTCDate } from '@bot/helpers/transform-date';
import { ReviewsModel } from '@bot/models/reviews.model';

export const reviewsCommandHandler = async (ctx: Context) => {
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
  return await ctx.replyWithHTML(string, { disable_web_page_preview: true, parse_mode: 'HTML' });
};
