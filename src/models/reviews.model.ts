import { prop, getModelForClass, ReturnModelType, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({ schemaOptions: { timestamps: true } })
export class Reviews extends TimeStamps {
  @prop({ required: true, default: '' }) videoId: string;
  @prop({ required: true, default: '' }) url: string;
  @prop({ required: true, default: '' }) date: string;
  @prop({ required: true, default: '' }) title: string;
  @prop({ required: true, default: '' }) channelTitle: string;

  static async saveReviews(this: ReturnModelType<typeof Reviews>, review: any) {
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = today.getUTCMonth();
    const day = today.getUTCDate();
    const date = `${day}-${month+1}-${year}`;

    const reviewFind = await this.findOne({ videoId: review.videoId });
    console.log(review.title);
    if (!reviewFind) {
      console.log('save', review.title);
      this.create(review)
    }
  }

  static async findReview(this: ReturnModelType<typeof Reviews>, title: string) {
    return await this.findOne({ title: { '$regex': title } });
  }
}

// Get User model
export const ReviewsModel = getModelForClass(Reviews);

