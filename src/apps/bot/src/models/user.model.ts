import { prop, getModelForClass, ReturnModelType, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export type ITimeZone = '-12' | '-11' | '-10' | '-9' | '-8' | '-7' | '-6' | '-5' | '-4' | '-3' | '-2' | '-1' | '0' | '+1' | '+2' | '+3' | '+4' | '+5' | '+6' | '+7' | '+8' | '+9' | '+10' | '+11';

@modelOptions({ schemaOptions: { timestamps: true } })
export class User extends TimeStamps {
  @prop({ required: true, index: true, unique: true }) chat_id: number;
  @prop({ required: true, default: 'ru' }) language: string;
  @prop({ required: true, default: '' }) username: string;
  @prop({ required: true, default: 'ok' }) status: string;
  @prop({ required: true, default: '0' }) timeZone: ITimeZone;

  static findAllUsers(this: ReturnModelType<typeof User>) {
    return this.find().exec();
  }

  static async saveStatusUser(this: ReturnModelType<typeof User>, { id, status }) {
    const user = await this.findOne({ chat_id: id })
    user.status = status;
    user.save();
    return user;
  }

  static async findUserOrSave(this: ReturnModelType<typeof User>, { id, username }) {
    let user = await this.findOne({ chat_id: id })
    if (!user) {
      try {
        user = await this.create({ chat_id: id, username });
        console.log(`Сохранен пользователь ${username}`);
      } catch (err) {
        user = await this.findOne({ chat_id: id })
      }
    }
    return user
  }
}

// Get User model
export const UserModel = getModelForClass(User) ;

