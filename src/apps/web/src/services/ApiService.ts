import axios from 'axios';
import {
  ISport24CompetitionsResponce,
  ISport24CompetitionReviewResponce,
  ISport24CompetitionStandingLeagueResponce,
  ISport24CompetitionStandingCupResponce
} from '@web/interfaces/sport24.interface';

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Accept': '*/*',
  },
})

instance.interceptors.request.use((config) => {
  return config
})

instance.interceptors.response.use((response) => {
  return response
})

export default {
  apiGetAllUsers() {
    return instance.get('/users')
  },
  apiGetAllTournaments(): Promise<{ data: ISport24CompetitionsResponce }> {
    return instance.get('https://api.sport24.ru/hub/v1/statistics/widget/sports/football/competitions')
  },
  apiGetTournamentInfo(urn: string, seasonUrn: string =''): Promise<{ data: ISport24CompetitionReviewResponce }> {
    const season = seasonUrn && `seasonUrn=${seasonUrn}&`;
    return instance.get(`https://api.sport24.ru/api-aggregator/v1/competitions/${urn}/review?${season}materialsLimit=0&newsLimit=0`)
  },
  apiGetTournamentStanding(id: number): Promise<{ data: ISport24CompetitionStandingLeagueResponce | ISport24CompetitionStandingCupResponce }> {
    return instance.get(`https://api.sport24.ru/hub/v2/statistics/widget/competitions/standings/${id}`)
  }
}
