"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
let User = User_1 = class User extends defaultClasses_1.TimeStamps {
    static findAllUsers() {
        return this.find().exec();
    }
    static async saveStatusUser({ id, status }) {
        const user = await this.findOne({ chat_id: id });
        user.status = status;
        user.save();
        return user;
    }
    static async findUserOrSave({ id, username }) {
        let user = await this.findOne({ chat_id: id });
        if (!user) {
            try {
                user = await this.create({ chat_id: id, username });
                console.log(`Сохранен пользователь ${username}`);
            }
            catch (err) {
                user = await this.findOne({ chat_id: id });
            }
        }
        return user;
    }
};
__decorate([
    (0, typegoose_1.prop)({ required: true, index: true, unique: true }),
    __metadata("design:type", Number)
], User.prototype, "chat_id", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 'ru' }),
    __metadata("design:type", String)
], User.prototype, "language", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 'ok' }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: '0' }),
    __metadata("design:type", String)
], User.prototype, "timeZone", void 0);
User = User_1 = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { timestamps: true } })
], User);
exports.User = User;
// Get User model
exports.UserModel = (0, typegoose_1.getModelForClass)(User);
//# sourceMappingURL=user.model.js.map