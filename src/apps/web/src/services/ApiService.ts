import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Access-Control-Allow-Origin': '*',
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
  apiGetAllTournaments() {
    return instance.get('https://api.sport24.ru/hub/v1/statistics/widget/sports/football/competitions')
  },
  apiGetTournamentInfo(urn: string) {
    return instance.get(`https://api.sport24.ru/api-aggregator/v1/competitions/${urn}/review?materialsLimit=0&newsLimit=0`)
  },
  apiGetTournamentStanding(id: number) {
    return instance.get(`https://api.sport24.ru/hub/v2/statistics/widget/competitions/standings/${id}`)
  }
}
