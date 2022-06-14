<script setup lang="ts">
import { onMounted } from 'vue';
import ApiService from './services/ApiService';


onMounted( async () => {
  try {
    console.log(233);
    await ApiService.apiGetAllTournaments()
    // console.log('users', users.value)
  } catch (err) {
    console.log('err', err)
  }
})
</script>


<template>
  <div class="p-8">
    888999
  </div>
</template>