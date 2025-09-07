import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './session.schema';
import { Model } from 'mongoose';

@Injectable()
export class SessionRepository {
  constructor(@InjectModel(Session.name) private readonly sessionModel: Model<Session>) {}

  getSession(sessionId: string) {
    return this.sessionModel.findOne({ id: sessionId }).populate('userData').exec();
  }

  async setSession(sessionId: string, sessionData: any) {
    let session = await this.sessionModel.findOne({ id: sessionId }).exec();

    if (!session) {
      session = new this.sessionModel({ id: sessionId, ...sessionData, userData: sessionData.userData._id });
    } else {
      session.updateOne({ ...sessionData, ...sessionData, userData: sessionData.userData._id, createdAt: Date.now() });
      session.markModified('createdAt');
    }

    return session.save();
  }
}
