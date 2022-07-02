import { prop, getModelForClass, ReturnModelType, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import logger from '@helpers/logger';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Review extends TimeStamps {
  @prop({ required: true, default: '' }) videoId!: string;
  @prop({ required: true, default: '' }) url!: string;
  @prop({ required: true, default: '' }) date!: string;
  @prop({ required: true, default: '' }) dateDay!: string;
  @prop({ required: true, default: '' }) title!: string;
  @prop({ required: true, default: '' }) channelTitle!: string;

  static async saveReviews(this: ReturnModelType<typeof Review>, review: any) {
    const reviewFind = await this.findOne({ videoId: review.videoId });
    if (!reviewFind) {
      logger.info({ msg: `check reviews save ${review.title}` });
      this.create(review)
    }
  }

  static async findReview(this: ReturnModelType<typeof Review>, date: string, title: RegExp) {
    return await this.findOne({ title: { '$regex': title, $options: 'i' }, date: { '$regex': date } });
  }

  static async findReviewsToday(this: ReturnModelType<typeof Review>, date: string) {
    return await this.find({ dateDay: date });
  }
}

export default getModelForClass(Review);

