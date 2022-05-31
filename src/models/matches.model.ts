import { prop, getModelForClass, ReturnModelType, modelOptions, Severity } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { IMatchesSaveAll } from '@bot/interfaces/sports.ru.interface';
import { TournamentsModel } from '@bot/models/tournamnets.model';
import logger from '@bot/logger';

@modelOptions({ schemaOptions: { timestamps: true }, options: { allowMixed: Severity.ALLOW } })
export class Matches extends TimeStamps {
  @prop({ required: true, default: [] }) ids: [string];
  @prop({ required: true, default: [] }) allIds: IMatchesSaveAll;
  @prop({ required: true, default: '' }) date: string;

  static async getTodayTopMatches(this: ReturnModelType<typeof Matches>, date: string): Promise<string[]> {
    const topTournaments = await TournamentsModel.getTopTournamentsId();
    const topTournamentsIds = topTournaments.map(t => t.sports_id);
    const day = await this.findOne({ date });
    const filter = (day && day.allIds) ? day.allIds.filter((m) => topTournamentsIds.includes(m.id)) : [];
    const ids = []
    filter.forEach(m => ids.push(...m.matchesIds));
    return ids;
  }

  static async saveMatchesAll(this: ReturnModelType<typeof Matches>, { matchesAll, date }: { matchesAll: IMatchesSaveAll, date: string }) {
    logger.info({ msg: 'saveMatchesAll ' + date });
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

