"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTime = void 0;
const setTime = (timeZone, date) => {
    const newDate = new Date(date);
    const hours = newDate.getHours();
    const diff = Number(timeZone) - 3;
    newDate.setHours(hours + diff);
    return newDate.toLocaleString('ru', { day: "numeric", month: "numeric", hour: "numeric", minute: "numeric" });
};
exports.setTime = setTime;
//# sourceMappingURL=transform-date.js.map