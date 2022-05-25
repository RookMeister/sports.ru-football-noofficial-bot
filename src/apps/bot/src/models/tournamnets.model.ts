import { prop, getModelForClass, modelOptions, ReturnModelType } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Tournaments extends TimeStamps {
  @prop({ required: true, default: '' }) name: string;
  @prop({ required: true, default: 0, unique: true }) sports_id: number;
  @prop({ required: true, default: false }) is_top: boolean;

  static async getTopTournamentsId(this: ReturnModelType<typeof Tournaments>): Promise<Tournaments[]> {
    const ids = await this.find({ is_top: true });
    return ids;
  }
}

// Get Tournaments model
export const TournamentsModel = getModelForClass(Tournaments) ;

