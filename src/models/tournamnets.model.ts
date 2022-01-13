import { prop, getModelForClass, ReturnModelType, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Tournaments extends TimeStamps {
  @prop({ required: true, default: '' }) name: string;
  @prop({ required: true, default: 0, unique: true }) sports_id: number;
  @prop({ required: true, default: false }) is_top: boolean;
}

// Get Tournaments model
export const TournamentsModel = getModelForClass(Tournaments) ;

