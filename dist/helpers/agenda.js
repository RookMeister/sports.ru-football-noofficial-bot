"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initAgenda = void 0;
const agenda_1 = require("agenda");
const { chromium } = require("playwright-chromium");
const matches_model_1 = require("@bot/models/matches.model");
const initAgenda = async () => {
    try {
        const agenda = new agenda_1.Agenda({
            db: {
                address: `${process.env.MONGO}`,
                collection: 'logs_agenda_jobs'
            }
        });
        agenda.define('check matches', async () => {
            try {
                const browser = await chromium.launch({ headless: true });
                const page = await browser.newPage();
                await page.goto('https://www.sports.ru/football');
                const ids = await page.$eval('[data-accordion-id="teaser"]', (elms) => {
                    const matches = [];
                    // const data = { teaser: { tournaments: [] } };
                    const list = elms.querySelectorAll('.accordion-group.teaser-group');
                    list.forEach((item, i) => {
                        const title = item.querySelector('.accordion__title');
                        // data.teaser.tournaments.push({ name: title.innerText, sport: { id: 208 }, matches: [] });
                        const listElms = item.querySelectorAll('.teaser-event');
                        listElms.forEach((li) => {
                            const id = li.getAttribute('data-match-id');
                            matches.push(id);
                            // const status = li.getAttribute('data-status');
                            // const [a, b] = li.querySelectorAll('.teaser-event__board-player');
                            // data.teaser.tournaments[i].matches.push({
                            //   start_time: { short_date: '01.01' },
                            //   online_url: `/football/match/${id}/`,
                            //   status: { name: status },
                            //   first_team: { name: a.innerText },
                            //   second_team: { name: b.innerText }
                            // });
                        });
                    });
                    return matches;
                });
                await matches_model_1.MatchesModel.saveMatches({ ids });
                await browser.close();
            }
            catch (error) {
                console.log('check matches', error);
            }
        });
        await agenda.start();
        // await agenda.every('1 hours', 'check matches');
        await agenda.every('1 minutes', 'check matches');
    }
    catch { }
};
exports.initAgenda = initAgenda;
//# sourceMappingURL=agenda.js.map