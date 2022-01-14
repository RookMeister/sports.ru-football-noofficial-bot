import { Agenda } from 'agenda';
import { chromium } from 'playwright-chromium';
import { getReviewMatches } from '@bot/helpers/api'
import { MatchesModel } from '@bot/models/matches.model';
import { TournamentsModel } from '@bot/models/tournamnets.model';
import { ReviewsModel } from '@bot/models/reviews.model';
import { getMatches } from '@bot/helpers/api';

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
        await page.goto('https://www.sports.ru/football/match/');
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
        await TournamentsModel.create(tournaments);
      } catch (error) {
        console.log('check tournaments', error);
      }
    });
    agenda.define('check matches', async () => {
      try {
        const browser = await chromium.launch({ chromiumSandbox: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://www.sports.ru/football');
        const ids = await page.$eval('[data-accordion-id="teaser"]', (elms: any) => {
          const matches = [];
          const list = elms.querySelectorAll('.accordion-group.teaser-group');
          list.forEach((item, i) => {
            const listElms = item.querySelectorAll('.teaser-event');
            listElms.forEach((li) => {
              const id = li.getAttribute('data-match-id');
              matches.push(id);
            });
          });
          return matches;
        });
        await MatchesModel.saveMatches({ ids });
        await browser.close();
      } catch (error) {
        console.log('check matches', error);
      }
    });
    agenda.define('check reviews', async () => {
      const reviews = await getReviewMatches();
      for (const r of reviews) {
        await ReviewsModel.saveReviews(r);
      }
    })

    await agenda.start();
    await agenda.every('0 04 * * *', 'check tournaments');
    await agenda.every('1 hours', 'check matches');
    await agenda.every('0 00,04,17,20,23 * * *', 'check reviews');
  } catch {}
}
