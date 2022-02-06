import { prop, getModelForClass, ReturnModelType, modelOptions, Severity } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { UTCDate } from '@bot/helpers/transform-date';
import { IMatchesSaveAll } from '@bot/interfaces/sports.ru.interface';

@modelOptions({ schemaOptions: { timestamps: true }, options: { allowMixed: Severity.ALLOW } })
export class Matches extends TimeStamps {
  @prop({ required: true, default: [] }) ids: [string];
  @prop({ required: true, default: [] }) allIds: IMatchesSaveAll;
  @prop({ required: true, default: '' }) date: string;

  static async getTodayMatches(this: ReturnModelType<typeof Matches>) {
    const date = UTCDate();
    const matches = await this.findOne({ date });
    const ids = matches ? matches.ids : null;
    return ids;
  }

  static async saveMatches(this: ReturnModelType<typeof Matches>, { ids }) {
    const date = UTCDate();

    const matches = await this.findOne({ date })
    if (matches) {
      matches.ids = ids;
      matches.save();
    } else {
      this.create({ ids, date })
    }
  }

  static async saveMatchesAll(this: ReturnModelType<typeof Matches>, matchesAll: IMatchesSaveAll) {
    const date = UTCDate();

    const matches = await this.findOne({ date })
    if (matches) {
      matches.allIds = matchesAll;
      matches.save();
    } else {
      this.create({ allIds: matchesAll, date })
    }
  }
}

// Get User model
export const MatchesModel = getModelForClass(Matches) ;

