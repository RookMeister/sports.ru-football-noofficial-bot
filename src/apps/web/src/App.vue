<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ApiService from './services/ApiService';

const tournaments = ref();
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
  <div class="p-8">
    <div class="flex flex-wrap">
      <div v-for="item in tournaments" class="p-4"><img class="w-16 h-16" :src="'https://s74794.cdn.ngenix.net/m/' + item.image" alt="" srcset=""></div>
    </div>
  </div>
</template>