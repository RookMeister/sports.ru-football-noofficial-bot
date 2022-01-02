import { Markup } from 'telegraf';

type TArrayKeyboardButtons = { text: string, callback_data: string, hide: boolean }[];
type TArrayButtons = { label: string, value?: string }[];

export const inlineKeyboard = (array: TArrayButtons, size: number = 1, column = false) => {
  const buttons = markupButtons(array);
  return Markup.inlineKeyboard(constructorPosKey(buttons, size, column));
};
export const replyKeyboard = (array: TArrayButtons, size: number = 1, column = false) => {
  const buttons = markupButtons(array);
  return Markup.keyboard(constructorPosKey(buttons, size, column)).resize();
};

const markupButtons = (buttons: TArrayButtons) => {
  return buttons.map(b => {
    return Markup.button.callback(b.label, b.value || b.label);
  })
};
const constructorPosKey = (buttons: TArrayKeyboardButtons, size: number, column: boolean) => {
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
