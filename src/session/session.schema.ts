import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthData, LoginStrategy } from './AuthData';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema()
export class Session {
  @Prop({ unique: true, required: true })
  id: string;

  @Prop({ type: mongoose.SchemaTypes.ObjectId, ref: 'User' })
  userData: User;

  @Prop(raw({}))
  authData: AuthData;

  @Prop({
    enum: {
      values: Object.values(LoginStrategy),
      message: 'Login strategy {VALUE} is not supported',
    },
  })
  loginStrategy: LoginStrategy;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  cookie: Record<any, any>;

  @Prop({
    type: Date,
    default: Date.now,
    expires: 60 * 60,
  })
  createdAt: Date;
}

export type SessionDocument = HydratedDocument<Session>;

export const SessionSchema = SchemaFactory.createForClass(Session);
