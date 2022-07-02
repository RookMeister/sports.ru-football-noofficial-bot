import { prop, getModelForClass, ReturnModelType, modelOptions, Severity } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import TournamentsModel from '@api/models/Tournament';

interface IMatchesSaveAll {
  name: string;
  title: string;
  id: number;
  matchesIds: string[];
}

@modelOptions({ schemaOptions: { timestamps: true }, options: { allowMixed: Severity.ALLOW } })
export class Matches extends TimeStamps {
  @prop({ required: true, default: [] }) allIds!: IMatchesSaveAll[];
  @prop({ required: true, default: '' }) date!: string;

  static async getTopMatches(this: ReturnModelType<typeof Matches>, date: string): Promise<string[]> {
    const topTournaments = await TournamentsModel.getTopTournamentsId();
    const topTournamentsIds = topTournaments.map(t => t.sports_id);
    const day = await this.findOne({ date });
    const ids: string[] = [];

    if (day && day.allIds) {
      day.allIds.forEach((m) => {
        if (topTournamentsIds.includes(m.id)) {
          ids.push(...m.matchesIds);
        }
      })
    }

    return ids;
  }

  static async saveMatchesAll(this: ReturnModelType<typeof Matches>, allIds: IMatchesSaveAll[], date: string) {
    const matches = await this.findOne({ date })
    if (matches) {
      matches.allIds = allIds;
      matches.save();
    } else {
      this.create({ allIds, date })
    }
  }
}

export default getModelForClass(Matches) ;