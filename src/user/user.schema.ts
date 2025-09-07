import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v7 } from 'uuid';

@Schema()
export class User {
  @Prop({ unique: true, required: true, default: v7 })
  id: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop()
  username: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
