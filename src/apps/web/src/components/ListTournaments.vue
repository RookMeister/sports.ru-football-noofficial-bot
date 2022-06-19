<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ContentLoader from '@web/components/ContentLoader.vue';
import ApiService from '@web/services/ApiService';
import { ISport24Competition } from '@web/interfaces/sport24.interface';

// type TypeTournaments = { NATIONAL: ISport24Competition[], CLUB: ISport24Competition[], INTERNATIONAL: ISport24Competition[], FRIENDLY: ISport24Competition[] };

// const regions = ref<{ [key: string] :ISport24Region}>({})
// const regions = ['GR', 'RU', 'EU', 'EN', 'ES', 'IT', 'DE', 'FR', 'WSA', 'SRR', 'FFF', 'NL', 'TR', 'PT', 'BE', 'UA', 'KZ', 'BY', 'US', 'CN'];
const topStanding = ['Российская Премьер-Лига', 'Английская Премьер-лига', 'Ла Лига', 'Серия A', 'Бундеслига', 'Лига 1', 'Лига чемпионов', 'Лига Европы', 'Лига конференций']

const tournamentsAll = ref<ISport24Competition[]>([]);
// const tournaments = ref<ISport24Competition[]>([]);
const loading = ref(true);

// const setTour = (iso: string) => (tournaments.value = tournamentsAll.value.filter(item => item.region.iso === iso))

onMounted( async () => {
  try {
    const { data } = await ApiService.apiGetAllTournaments();
    topStanding.forEach((t) => {
      const item = data.items.find(s => s.title === t);
      item && tournamentsAll.value.push(item);
    });
    // tournamentsAll.value = data.items.reverse().sort((a, b) => {
    //   if (topStanding.includes(a.title)) { return -1 }
    //   else if (topStanding.includes(b.title)) { return 1 }
    //   else { return 0 }
    // });
  } catch (err) {
    console.log('err', err)
  }
  loading.value = false;
})
</script>

<template>
  <div v-if="!loading" class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4">
    <router-link v-for="item in tournamentsAll" :key="item.titleShort" :to="`/tournaments/?view=${item.urn}`" class="flex items-center flex-col text-center p-2 rounded-lg overflow-hidden" >
      <img class="h-20 w-20" :src="'https://s74794.cdn.ngenix.net/m/' + item.image" alt="" srcset="">
      <div class="mt-1 mb-auto">{{ item.titleShort }}</div>
    </router-link>
  </div>
  <ContentLoader class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4" v-else>
    <div class="w-full h-32 rounded-lg" v-for="i in 9" :key="i"></div>
  </ContentLoader>
</template>