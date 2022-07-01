<script setup lang="ts">
import { computed, ref } from 'vue';
import ContentLoader from '@web/components/ContentLoader.vue';
import { format, formatISO, startOfYesterday, startOfTomorrow  } from 'date-fns';
import { useFetch } from '@vueuse/core';
import { ISport24MatchesResponce } from '@interfaces/sport24.interface';

const IMG_URL = import.meta.env.VITE_IMG_URL;

const dates = [
  { title: 'Вчера', date: formatISO(startOfYesterday(), { representation: 'date' }) },
  { title: 'Сегодня', date: formatISO(new Date(), { representation: 'date' }) },
  { title: 'Завтра', date: formatISO(startOfTomorrow(), { representation: 'date' }) }
];
const activeDate = ref(formatISO(new Date(), { representation: 'date' }));
const url = computed(() => `/api/matches/${activeDate.value}/`);

const { isFetching, data: matches } = useFetch(url, { method: 'GET' }, { refetch: true }).json<ISport24MatchesResponce>();

const getSlugForImg = (key: number) => matches.value && (matches.value.participants[key].frontConfig.logos.default || '').replace('500_500.png', '30_30.png');
const getLiveMin = (time: string) => {
  const [min] = time.split(':');
  return min + "'";
}

</script>

<template>
  <nav class="px-6 flex w-full justify-between text-center">
    <div
      @click="activeDate = item.date"
      v-for="item in dates"
      :key="item.title"
      :class="(activeDate === item.date) && 'text-red-500 border-b-red-500'"
      class="p-2 block grow border-b-2"
    >
      {{ item.title }}
    </div>
  </nav>
  <div v-if="!isFetching" class="flex flex-col">
    <template v-if="matches">
      <div v-for="season in matches.seasons" :key="season.id" class="mt-4 divide-y divide-y-reverse">
        <div class="px-6 py-2 font-bold border-b">{{ season.titleRu }}</div>
        <template v-for="match in matches.items">
          <div v-if="match.seasonId === season.id" :key="match.id" class="px-6 flex justify-between py-2">
            <div class="w-56">
              <div v-for="team in match.competitors" :key="team.participantId" class="flex items-center">
                <img
                  v-if="getSlugForImg(team.participantId)"
                  class="h-auto mr-1"
                  style="width: 24px;height: 24px;"
                  :src="IMG_URL + getSlugForImg(team.participantId)"
                >
                <svg v-else width="24" height="24" style="color: #ddd;" viewBox="0 0 100 100"><path d="M50.045 0L12 6.997v54.591c0 4.202 1.882 8.74 5.604 13.493 3.3 4.205 7.971 8.511 13.883 12.8 7.381 5.336 14.905 9.31 18.558 11.119 3.659-1.81 11.183-5.782 18.562-11.119 5.916-4.288 10.58-8.594 13.877-12.8 3.725-4.759 5.613-9.29 5.613-13.493V6.998L50.045 0z" fill="currentColor" fill-rule="nonzero"></path></svg>
                <div class="truncate" :class="(team.place === 1) && !match.eventStatus.live && 'font-bold'">
                  {{ matches.participants[team.participantId].titleRu }}
                </div>
              </div>
            </div>
            <div v-if="!match.eventStatus.notStarted" class="flex items-center">
              <div v-if="match.eventStatus.live && match.eventClock" class="text-xs mr-2 text-amber-400">
                {{ getLiveMin(match.eventClock) }}
              </div>
              <a v-if="match.eventStatus.ended && match.reviewUrl" :href="match.reviewUrl"><img class="h-3" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxOSAxNCI+CiAgPHBhdGggZD0iTTE0LjkgMEg0LjFDMS44IDAgMCAxLjggMCA0LjF2NS44QzAgMTIuMiAxLjggMTQgNC4xIDE0aDEwLjhjMi4zIDAgNC4xLTEuOCA0LjEtNC4xVjQuMUMxOSAxLjggMTcuMiAwIDE0LjkgMHpNNyAxMC41di03TDE0IDdsLTcgMy41eiIvPgo8L3N2Zz4K" alt="с видео"></a>
              <div>
                <div
                  v-for="team in match.competitors"
                  :key="team.participantId + team.place"
                  :class="[(team.place === 1) && !match.eventStatus.live && 'font-bold', match.eventStatus.live && 'text-amber-400']"
                  class="flex items-center"
                >
                  {{ team.results[0] && team.results[0].value }}
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center text-neutral-400" v-else>
              <div>{{ format(new Date(match.startTime), "dd.MM HH:mm") }}</div>
              <div>{{ match.eventStatus.titleRu }}</div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
  <ContentLoader class="mt-8 px-6 py-2" v-else>
    <div class="w-full h-20 rounded-lg mt-2" v-for="i in 8" :key="i"></div>
  </ContentLoader>
</template>