import { Markup } from 'telegraf';
import { InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup } from 'telegraf/src/core/types/typegram';

type TArrayButtons = { label: string, value?: string, active: number, view?: 'url' | 'webApp' }[];
type Hideable<B> = B & { hide?: boolean }

export const inlineKeyboard = (array: TArrayButtons, size: number = 1, column = false) => {
  const buttons = markupButtons(array);
  return Markup.inlineKeyboard(constructorPosKey(buttons, size, column));
};
export const replyKeyboard = (array: TArrayButtons, size: number = 1, column = false) => {
  const buttons = markupButtons(array);
  return Markup.keyboard(constructorPosKey(buttons, size, column)).resize();
};

const markupButtons = (buttons: TArrayButtons) => {
  const arr = buttons.filter(b => b.active);
  return arr.map(b => {
    const view = b.view || 'callback';
    return Markup.button[view](b.label, b.value || b.label);
  })
};
const constructorPosKey = (buttons: (Hideable<InlineKeyboardButton.CallbackButton> | Hideable<InlineKeyboardButton.UrlButton> | Hideable<InlineKeyboardButton.WebAppButton>)[], size: number, column: boolean) => {
  const res = []; //массив в который будет выведен результат.
  if (column) {
    let length = buttons.length;
    let start = 0;
    for (let i = 0; i < size; i++){
      res[i] = buttons.slice(start, start + Math.ceil(length/size));
      start += Math.ceil(length/size);
      length -= Math.ceil(length/size);
    }
  } else {
    for (let i = 0; i < Math.ceil(buttons.length/size); i++){
      res[i] = buttons.slice((i*size), (i*size) + size);
    }
  }
  return [...res];
}
