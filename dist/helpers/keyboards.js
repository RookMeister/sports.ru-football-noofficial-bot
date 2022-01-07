"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyKeyboard = exports.inlineKeyboard = void 0;
const telegraf_1 = require("telegraf");
const inlineKeyboard = (array, size = 1, column = false) => {
    const buttons = markupButtons(array);
    return telegraf_1.Markup.inlineKeyboard(constructorPosKey(buttons, size, column));
};
exports.inlineKeyboard = inlineKeyboard;
const replyKeyboard = (array, size = 1, column = false) => {
    const buttons = markupButtons(array);
    return telegraf_1.Markup.keyboard(constructorPosKey(buttons, size, column)).resize();
};
exports.replyKeyboard = replyKeyboard;
const markupButtons = (buttons) => {
    const arr = buttons.filter(b => b.active);
    return arr.map(b => {
        return telegraf_1.Markup.button.callback(b.label, b.value || b.label);
    });
};
const constructorPosKey = (buttons, size, column) => {
    const res = []; //массив в который будет выведен результат.
    if (column) {
        let length = buttons.length;
        let start = 0;
        for (let i = 0; i < size; i++) {
            res[i] = buttons.slice(start, start + Math.ceil(length / size));
            start += Math.ceil(length / size);
            length -= Math.ceil(length / size);
        }
    }
    else {
        for (let i = 0; i < Math.ceil(buttons.length / size); i++) {
            res[i] = buttons.slice((i * size), (i * size) + size);
        }
    }
    return [...res];
};
//# sourceMappingURL=keyboards.js.map