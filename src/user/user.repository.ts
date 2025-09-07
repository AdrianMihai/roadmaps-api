import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserData } from './UserData';
import { isNullOrUndefined } from 'src/utils/CommonUtils';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async addUser(userData: UserData): Promise<UserDocument> {
    const existingUser = await this.userModel.findOneAndUpdate({ email: userData.email }, userData).exec();

    if (!isNullOrUndefined(existingUser)) return existingUser as UserDocument;

    return new this.userModel(userData).save();
  }
}
