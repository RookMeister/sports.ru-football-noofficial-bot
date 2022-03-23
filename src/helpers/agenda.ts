import { Agenda } from 'agenda';
import { chromium } from 'playwright-chromium';
import { getReviewMatches } from '@bot/helpers/api'
import { MatchesModel } from '@bot/models/matches.model';
import { TournamentsModel } from '@bot/models/tournamnets.model';
import { ReviewsModel } from '@bot/models/reviews.model';
import { getMatches } from '@bot/helpers/api';
import { UTCNext1Day } from '@bot/helpers/transform-date';

export const initAgenda = async () => {
  try {
    const agenda = new Agenda({
      db: {
        address: `${process.env.MONGO}`,
        collection: 'logs_agenda_jobs'
      }
    });

    agenda.define('check tournaments', async () => {
      try {
        const browser = await chromium.launch({ chromiumSandbox: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        const date = UTCNext1Day();
        await page.goto(`https://www.sports.ru/football/match/${date}/`, { waitUntil: 'load', timeout: 0 });
        const ids = await page.$eval('.panel.active-panel', (elms: any) => {
          const matches = [];
          const list = elms.querySelectorAll('[data-match-id]');
          list.forEach(item => {
            const id = item.getAttribute('data-match-id');
            matches.push(id);
          });
          return matches;
        });
        await browser.close();
        const matches = await getMatches(ids);
        const tournaments = matches.map(({ name, id }) => ({ name, sports_id: id }))
        await TournamentsModel.create(tournaments).catch(e => console.log(666, e));
        const matchesAll = matches.map(({ name, id, matchesIds, title }) => ({ name, title, id, matchesIds }))
        await MatchesModel.saveMatchesAll(matchesAll);
      } catch (error) {
        console.log('check tournaments', error);
      }
    });
    agenda.define('check reviews', async () => {
      const reviews = await getReviewMatches();
      for (const r of reviews) {
        await ReviewsModel.saveReviews(r);
      }
    })

    await agenda.start();
    await agenda.every('0 00,01 * * *', 'check tournaments');
    await agenda.every('0 01,02,17,20,23 * * *', 'check reviews');
  } catch {}
}
