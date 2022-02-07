import { prop, getModelForClass, ReturnModelType, modelOptions, Severity } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { UTCDate } from '@bot/helpers/transform-date';
import { IMatchesSaveAll } from '@bot/interfaces/sports.ru.interface';
import { TournamentsModel } from '@bot/models/tournamnets.model';

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

  static async getTodayTopMatches(this: ReturnModelType<typeof Matches>): Promise<string[]> {
    const date = UTCDate();
    const topTournaments = await TournamentsModel.getTopTournamentsId();
    const topTournamentsIds = topTournaments.map(t => t.sports_id);
    const day = await this.findOne({ date });
    const filter = day.allIds.filter((m) => topTournamentsIds.includes(m.id));
    const ids = []
    filter.forEach(m => ids.push(...m.matchesIds));
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
    console.log(matches.date, matchesAll[0]);
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

