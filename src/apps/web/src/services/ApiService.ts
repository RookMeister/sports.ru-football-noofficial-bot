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
}
