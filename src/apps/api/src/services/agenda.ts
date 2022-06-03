import { Agenda } from 'agenda';
import { chromium } from 'playwright-chromium';
import { getReviewMatches } from '@api/controllers/reviews';
import MatchesModel from '@api/models/Matches';
import ReviewModel from '@api/models/Review';
import TournamentModel from '@api/models/Tournament';
import { getMatches } from '@api/controllers/matches';
import logger from '@api/helpers/logger';
import { UTCNext1Day } from '@api/helpers/transform-date';
import { config } from '@api/config';

const agenda = new Agenda({
  db: {
    address: config.MONGO || '',
    collection: 'logs_agenda_jobs'
  }
});

agenda.define('check matches', async () => {
  try {
    logger.info({ msg: 'start check matches' });
    const browser = await chromium.launch({ chromiumSandbox: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    const date = UTCNext1Day();
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
    logger.error(undefined, `check matches error`, error);
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
    await agenda.define('check matches', {});
    await agenda.every('0 00,01 * * *', 'check matches');
    await agenda.every('0 01,02,17,20,23 * * *', 'check reviews');
  } catch {}
}