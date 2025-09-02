import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserData } from 'src/user/UserData';
import { AuthData, LoginStrategy } from './AuthData';
import mongoose, { Date, HydratedDocument } from 'mongoose';

@Schema()
export class Session {
  @Prop({ unique: true, required: true })
  id: string;

  @Prop(
    raw({
      username: String,
      email: String,
    }),
  )
  userData: UserData;

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
