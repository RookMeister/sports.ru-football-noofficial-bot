<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import ApiService from '@/services/ApiService';

const route = useRoute()
const tournament = ref(null);
const season = ref(null);

onMounted( async () => {
  try {
    const { data: info } = await ApiService.apiGetTournamentInfo(route.params.id);
    const { data: standing } = await ApiService.apiGetTournamentStanding(info.stages.actualId);
    tournament.value = info;
    season.value = standing;
  } catch (err) {
    console.log('err', err)
  }
})
</script>


<template>
  <div v-if="tournament" class="flex flex-col items-center">
    <img class="h-40 w-40" :src="'https://s74794.cdn.ngenix.net/m/' + tournament.header.image" alt="" srcset="">
    <p>{{ tournament.header.title }}</p>
    <table v-if="season" class="w-full mt-6 text-sm text-left border-spacing-y-2 border-separate">
      <thead class="border-b border-slate-500">
        <tr class="border-b border-slate-5">
          <th scope="col">#</th>
          <th scope="col">Team</th>
          <th scope="col">W</th>
          <th scope="col">D</th>
          <th scope="col">L</th>
          <th scope="col">GD</th>
          <th scope="col">PTS</th>
        </tr>
      </thead>
      <tr v-for="item in season.items.sort((a, b) => a.standingTable.rank - b.standingTable.rank)" :key="item.participantId">
        <td>{{ item.standingTable.rank }}</td>
        <td>{{ season.participants[item.participantId].titleRu }}</td>
        <td>{{ item.standingTable.win }}</td>
        <td>{{ item.standingTable.draw }}</td>
        <td>{{ item.standingTable.loss }}</td>
        <td>{{ item.standingTable.goalsDiff }}</td>
        <td>{{ item.standingTable.points }}</td>
      </tr>
    </table>
  </div>
</template>