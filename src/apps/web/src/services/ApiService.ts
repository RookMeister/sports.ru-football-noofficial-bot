import { useFetch, UseFetchReturn } from '@vueuse/core';
import { ref, watch, Ref } from 'vue';
// import config from '@web/helpers/config';

const urls = {
  getMatches: (date: string) => import.meta.env.VITE_FETCH_GET_MATCHES_URL + date,
  getCompetition: ({ urn, seasonUrn = '' }: any) => {
    const season = seasonUrn ? `seasonUrn=${seasonUrn}` : '';
    return import.meta.env.VITE_FETCH_GET_COMPETITION_URL + `${urn}/review?materialsLimit=0&newsLimit=0&${season}`;
  },
  getStanding: (id: string) => import.meta.env.VITE_FETCH_GET_STANDING_URL + id,
  getAllCompetitions: () => import.meta.env.VITE_FETCH_GET_ALL_COMPETITIONS_URL
}

type viewRequest = 'getMatches' | 'getAllCompetitions' | 'getStanding' | 'getCompetition';

export function api<T>(method: viewRequest, query?: Ref<any>): UseFetchReturn<T> {
  const url = ref('')
  watch(() => query && query.value, (newValues) => {
    url.value = urls[method](newValues)
  }, { deep: true, immediate: true });

  const options = { refetch: true, immediate: true };

  if (query && (query).value === 0) {
    options.immediate = false;
  }

  return useFetch(url, options).get().json();
}
