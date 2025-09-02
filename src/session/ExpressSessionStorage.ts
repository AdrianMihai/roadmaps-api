import session, { SessionData } from 'express-session';
import { SessionRepository } from './session.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ExpressSessionStorage extends session.Store {
  constructor(private readonly sessionRepository: SessionRepository) {
    super();
  }
  // regenerate(req: Request, callback: (err?: any) => any): void {

  // }

  // load(sid: string, callback: (err: any, session?: session.SessionData) => any): void {

  // }

  destroy(sessionId) {
    console.log(sessionId);
  }

  async get(sessionId, callback) {
    try {
      const sessionDocument = await this.sessionRepository.getSession(sessionId);

      console.log(sessionId, sessionDocument);

      callback(null, sessionDocument);

      return sessionDocument;
    } catch (e) {
      console.log(e.message);
      callback(e.message, null);
    }
  }

  async set(sessionId: string, session: SessionData, callback) {
    try {
      await this.sessionRepository.setSession(sessionId, session);

      callback(null);
    } catch (e) {
      callback(e.message);
    }
  }
}
