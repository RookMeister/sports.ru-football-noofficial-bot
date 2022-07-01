import { prop, getModelForClass, ReturnModelType, modelOptions } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class Stat {
  @prop({ required: true, index: true }) date: string
  @prop({ required: true, default: 0 }) count: number
  @prop({ required: true, default: '' }) view: string

  static getAllStat(this: ReturnModelType<typeof Stat>) {
    return this.find().exec();
  }

  static getStatOfDate(this: ReturnModelType<typeof Stat>, date: string) {
    return this.find({ date }).exec();
  }

  static async countUpStat(this: ReturnModelType<typeof Stat>, date: string, view: string) {
    const stat = await this.findOne({ date, view }).exec();
    if (stat) {
      stat.count += 1;
      stat.save();
    } else {
      await this.create({ date, view, count: 1 });
    }
  }
}

export const StatModel = getModelForClass(Stat) ;