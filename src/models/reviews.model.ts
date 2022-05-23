import { prop, getModelForClass, ReturnModelType, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import logger from '@bot/logger';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Reviews extends TimeStamps {
  @prop({ required: true, default: '' }) videoId: string;
  @prop({ required: true, default: '' }) url: string;
  @prop({ required: true, default: '' }) date: string;
  @prop({ required: true, default: '' }) dateDay: string;
  @prop({ required: true, default: '' }) title: string;
  @prop({ required: true, default: '' }) channelTitle: string;

  static async saveReviews(this: ReturnModelType<typeof Reviews>, review: any) {
    const reviewFind = await this.findOne({ videoId: review.videoId });
    if (!reviewFind) {
      logger.info({ msg: `save ${review.title}` });
      this.create(review)
    }
  }

  static async findReview(this: ReturnModelType<typeof Reviews>,{ date, title }: { date: string, title: RegExp }) {
    return await this.findOne({ title: { '$regex': title, $options: 'i' }, date: { '$regex': date } });
  }

  static async findReviewToday(this: ReturnModelType<typeof Reviews>, date: string) {
    return await this.find({ date: { '$regex': date } });
  }
}

// Get User model
export const ReviewsModel = getModelForClass(Reviews);

