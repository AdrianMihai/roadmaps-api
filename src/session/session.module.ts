import { Module } from '@nestjs/common';
import { ExpressSessionStorage } from './ExpressSessionStorage';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './session.schema';
import { SessionRepository } from './session.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }])],
  providers: [SessionRepository, ExpressSessionStorage],
  exports: [ExpressSessionStorage],
})
export class SessionModule {}
