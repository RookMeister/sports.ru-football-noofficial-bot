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
var Matches_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchesModel = exports.Matches = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
let Matches = Matches_1 = class Matches extends defaultClasses_1.TimeStamps {
    static async getTodayMatches() {
        const today = new Date();
        const year = today.getUTCFullYear();
        const month = today.getUTCMonth();
        const day = today.getUTCDate();
        const date = `${day}-${month + 1}-${year}`;
        const { ids } = await this.findOne({ date });
        return ids || null;
    }
    static async saveMatches({ ids }) {
        const today = new Date();
        const year = today.getUTCFullYear();
        const month = today.getUTCMonth();
        const day = today.getUTCDate();
        const date = `${day}-${month + 1}-${year}`;
        const matches = await this.findOne({ date });
        if (matches) {
            matches.ids = ids;
            matches.save();
        }
        else {
            this.create({ ids, date });
        }
    }
};
__decorate([
    (0, typegoose_1.prop)({ required: true, default: [] }),
    __metadata("design:type", Array)
], Matches.prototype, "ids", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: '' }),
    __metadata("design:type", String)
], Matches.prototype, "date", void 0);
Matches = Matches_1 = __decorate([
    (0, typegoose_1.modelOptions)({ schemaOptions: { timestamps: true } })
], Matches);
exports.Matches = Matches;
// Get User model
exports.MatchesModel = (0, typegoose_1.getModelForClass)(Matches);
//# sourceMappingURL=matches.model.js.map