import LocalSession from 'telegraf-session-local';

declare module 'telegraf' {
  interface Context {
    session: Record<string, any>;
  }
}

export const setupSessionMiddleware = () =>
  new LocalSession({ database: 'sessions.json' }).middleware();
