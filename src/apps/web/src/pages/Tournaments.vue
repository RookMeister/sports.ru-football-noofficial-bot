<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ContentLoader from '@/components/ContentLoader.vue';
import ApiService from '@/services/ApiService';

const tournaments = ref(null);
onMounted( async () => {
  try {
    const { data: { items } } = await ApiService.apiGetAllTournaments();
    tournaments.value = items;
  } catch (err) {
    console.log('err', err)
  }
})
</script>


<template>
  <div v-if="tournaments" class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4">
    <router-link :to="{ name: 'tournamentsId', params: { id: item.urn } }" class="p-2 text-center min-h-40" v-for="item in tournaments">
      <img :src="'https://s74794.cdn.ngenix.net/m/' + item.image" alt="" srcset="">
      <p>{{ item.titleShort }}</p>
    </router-link>
  </div>
  <ContentLoader class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4" v-else>
    <div class="w-full h-40" v-for="i in 81" :key="i"></div>
  </ContentLoader>
</template>