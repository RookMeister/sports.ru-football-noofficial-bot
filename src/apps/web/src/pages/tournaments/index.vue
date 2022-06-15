<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ContentLoader from '@/components/ContentLoader.vue';
import TableTournaments from '@/components/TableTournaments.vue';
import { useRoute } from 'vue-router';
import ApiService from '@/services/ApiService';

const route = useRoute();
const id = route.query.view || '';
console.log(id);

const tournaments: any = ref(null);
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
  <div v-if="tournaments && !id" class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4">
    <router-link :to="`/tournaments/?view=${item.urn}`" class="p-2 text-center min-h-40" v-for="item in tournaments" :key="item.title">
      <img :src="'https://s74794.cdn.ngenix.net/m/' + item.image" alt="" srcset="">
      <p>{{ item.titleShort }}</p>
    </router-link>
  </div>
  <TableTournaments v-else-if="id" :view="id.toString()" />
  <ContentLoader class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-4" v-else>
    <div class="w-full h-40" v-for="i in 81" :key="i"></div>
  </ContentLoader>
</template>