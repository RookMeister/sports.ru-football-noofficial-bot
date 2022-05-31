import { UTCDate } from '@api/helpers/transform-date';
import request from '@api/helpers/request';
import { config } from '@api/config';
import { IYouTubeVideo } from '@api/interfaces/sports.ru.interface';

export const getReviewMatches = async (): Promise<any[] | null> => {
  if (config.API_KEY_YOTUBE && config.ID_CHANELS) {
    const ids = config.ID_CHANELS.split(',');
    const requests =
      ids.map(id => request(`https://www.googleapis.com/youtube/v3/search?key=${config.API_KEY_YOTUBE}&channelId=${id}&part=snippet,id&order=date&maxResults=10&regionCode=RU`));
    const response = await Promise.all(requests);
    const data: IYouTubeVideo[] = [];
    response.forEach((y: any) => {
      if (y.items) {
        y.items.forEach((v: any) => {
          const condition1 = v.snippet.title.includes('Обзор матча');
          const condition2 = v.snippet.title.includes('Обзор первого матча');
          const condition3 = v.snippet.title.includes('Обзор второго матча');
          const condition4 = v.snippet.title.includes('Лучшие моменты матча');
          const condition5 = v.snippet.title.includes('Огляд матчу');
          const condition6 = v.snippet.title.includes('Обзор');
          if (condition1 || condition2 || condition3 || condition4 || condition5 || condition6) {
            data.push({
              videoId: v.id.videoId,
              url: `https://www.youtube.com/watch?v=${v.id.videoId}`,
              date: v.snippet.publishedAt,
              dateDay: UTCDate(),
              title: v.snippet.title.replace('-', '—'),
              channelTitle: v.snippet.channelTitle
            })
          }
        });
      }
    })
    return data
  } else {
    return null;
  }
}