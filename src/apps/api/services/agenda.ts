import { Agenda } from 'agenda';
import { chromium } from 'playwright-chromium';
import { getReviewMatches } from '@api/controllers/reviews';
import MatchesModel from '@api/models/Matches';
import ReviewModel from '@api/models/Review';
import TournamentModel from '@api/models/Tournament';
import { getMatches } from '@api/controllers/matches';
import logger from '@helpers/logger';
import { UTCTomorrow } from '@helpers/transform-date';
import config from '@helpers/config';

const agenda = new Agenda({
  db: {
    address: config.MONGO || '',
    collection: 'logs_agenda_jobs'
  }
});

agenda.define('check matches', async (job: any) => {
  try {
    logger.info({ msg: 'start check matches' });
    const browser = await chromium.launch({ chromiumSandbox: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const date = job.attrs.data || UTCTomorrow();
    logger.info({ msg: `https://www.sports.ru/football/match/${date}/` });
    await page.goto(`https://www.sports.ru/football/match/${date}/`, { waitUntil: 'load', timeout: 0 });
    const ids = await page.$eval('.panel.active-panel', (elms) => {
      const matches: string[] = [];
      const list = elms.querySelectorAll('[data-match-id]');
      list.forEach(item => {
        const id = item.getAttribute('data-match-id');
        id && matches.push(id);
      });
      return matches;
    });
    await browser.close();
    const matches = await getMatches(ids, date);
    if (matches) {
      const tournaments = matches.map(({ name, id }) => ({ name, sports_id: id }))
      await TournamentModel.create(tournaments).catch(e => logger.info({ msg: e }));
      const matchesAll = matches.map(({ name, id, matchesIds, title }) => ({ name, title, id, matchesIds }));
      await MatchesModel.saveMatchesAll(matchesAll, date);
    }

    logger.info({ msg: 'finish check matches' });
  } catch (error) {
    logger.error(undefined, `error check matches`, error);
  }
});
agenda.define('check reviews', async () => {
  logger.info({ msg: 'start check reviews' });
  const reviews = await getReviewMatches();
  if (reviews && reviews.length) {
    for (const r of reviews) {
      await ReviewModel.saveReviews(r);
    }
  }
  logger.info({ msg: 'finish check reviews' });

})

export const initAgenda = async () => {
  try {
    await agenda.start();
    await agenda.every('0 00,01 * * *', 'check matches');
    await agenda.every('0 01,02,17,20,23 * * *', 'check reviews');
  } catch {}
}

export const checkMatches = async (date: string) => {
  try {
    await agenda.now('check matches', date);
  } catch {}
}