"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectData = void 0;
const telegraf_callback_data_1 = require("telegraf-callback-data");
const selectData = (identifier) => new telegraf_callback_data_1.CallbackData(identifier, ['code']);
exports.selectData = selectData;
//# sourceMappingURL=callback-data.js.map