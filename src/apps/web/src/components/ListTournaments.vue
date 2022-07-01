<script setup lang="ts">
import { computed, ref } from 'vue';
import ContentLoader from '@web/components/ContentLoader.vue';
// import config from '@web/helpers/config';
import { useFetch } from '@vueuse/core';
import { ISport24CompetitionsResponce } from '@web/interfaces/sport24.interface';

const IMG_URL = import.meta.env.VITE_IMG_URL;

const topStanding = [
  'Российская Премьер-Лига', 'Английская Премьер-лига', 'Ла Лига', 'Серия A', 'Бундеслига', 'Лига 1', 'Эредивизи', 'MLS'
];
const viewsStanding = [
  { title: 'Национальные', leagueType: 'NATIONAL'},
  { title: 'Клубные', leagueType: 'CLUB'},
  { title: 'Сборные', leagueType: 'INTERNATIONAL'}
];

const activeBlock = ref('NATIONAL');
const { isFetching, data  } = useFetch('/api/competition/', { method: 'GET' }, { refetch: true }).json<ISport24CompetitionsResponce>();


const tournamentsAll = computed(() => {
  if (data.value) {
    return data.value.items.sort((a, b) => {
      const find1 = topStanding.find(s => s === a.title);
      const find2 = topStanding.find(s => s === b.title);
      if (find1 && find2) {
        return 1;
      } else if (find1) {
        return -1;
      } else if (find2) {
        return 1;
      } else if (a.title.includes('Кубок')) {
        return -1;
      } if (b.title.includes('Кубок')) {
        return 1;
      }

      return a.title.localeCompare(b.title)
    })
  }

  return [];
})

</script>

<template>
  <nav class="flex w-full justify-between text-center px-6">
    <div
      @click="activeBlock = item.leagueType"
      v-for="item in viewsStanding"
      :class="(activeBlock === item.leagueType) && 'text-red-500 border-b-red-500'"
      class="w-1/3 p-2 block grow border-b-2 truncate"
    >
      {{ item.title }}
    </div>
  </nav>
  <div v-if="!isFetching" class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4 mt-4 px-6">
    <template v-for="item in tournamentsAll">
      <router-link v-if="activeBlock === item.leagueType" :to="`/bot/standings/${item.urn}`" class="flex items-center flex-col text-center p-2 rounded-lg overflow-hidden" >
        <img v-if="item.image" class="h-20 w-20" :src="IMG_URL + item.image">
        <div v-else class="h-20 w-20" />
        <div class="mt-1 mb-auto">{{ item.titleShort || item.title }}</div>
      </router-link>
    </template>
  </div>
  <ContentLoader class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4 mt-4 px-6" v-else>
    <div class="w-full h-32 rounded-lg" v-for="i in 12" :key="i"></div>
  </ContentLoader>
</template>