<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ApiService from '@web/services/ApiService';
import { ISport24CompetitionReviewResponce } from '@web/interfaces/sport24.interface';

const tournament = ref<ISport24CompetitionReviewResponce | null>(null);
const season: any = ref(null);
const activeBlock = ref(0);

const props = defineProps({
  view: String
})

const getStanding = (id: number) => {
  if (activeBlock.value !== id) {
    ApiService.apiGetTournamentStanding(id).then(({ data: standing }) => {
      activeBlock.value = id;
      season.value = standing;
    });
  }
}

onMounted( async () => {
  if (props.view) {
    try {
      const { data: info } = await ApiService.apiGetTournamentInfo(props.view);
      getStanding(info.stages.actualId)
      tournament.value = info;
    } catch (err) {
      console.log('err', err)
    }
  }
})
</script>


<template>
  <div v-if="tournament" class="flex flex-col items-center">
    <img class="h-24 w-24" :src="'https://s74794.cdn.ngenix.net/m/' + tournament.header.image" alt="" srcset="">
    <h1><b>{{ (tournament.header).title }}</b></h1>
    <nav class="flex w-full justify-between text-center">
      <div @click="getStanding(item.id)" v-for="item in tournament.stages.items" :class="tournament.stages.items.length > 1 ? `w-1/${tournament.stages.items.length}` : 'w-full'" class="p-2 block text-red-500 border-b-2 font-medium border-b-red-500">
        {{ item.titleRu }}
      </div>
    </nav>
    <table v-if="season" class="w-full mt-6 text-sm text-left border-spacing-y-2 border-separate table-auto">
      <thead>
        <tr>
          <th class="py-2 border-b border-b-gray-300" scope="col">#</th>
          <th class="py-2 border-b border-b-gray-300" scope="col">Team</th>
          <th class="py-2 border-b border-b-gray-300 text-center" scope="col">W</th>
          <th class="py-2 border-b border-b-gray-300 text-center" scope="col">D</th>
          <th class="py-2 border-b border-b-gray-300 text-center" scope="col">L</th>
          <th class="py-2 border-b border-b-gray-300 text-center" scope="col">GD</th>
          <th class="py-2 border-b border-b-gray-300 text-center" scope="col">PTS</th>
        </tr>
      </thead>
      <tr v-for="item in season.items.sort((a: any, b: any) => a.standingTable.rank - b.standingTable.rank)" :key="item.participantId">
        <td>{{ item.standingTable.rank }}</td>
        <td class="w-32 flex">
          <img class="h-4 w-4 mr-2" :src="'https://s74794.cdn.ngenix.net/m/' + season.participants[item.participantId].frontConfig.mobileBackgrounds.default" alt="" srcset="">
          <div class="truncate">{{ season.participants[item.participantId].titleRu }}</div>
        </td>
        <td class="text-center">{{ item.standingTable.win }}</td>
        <td class="text-center">{{ item.standingTable.draw }}</td>
        <td class="text-center">{{ item.standingTable.loss }}</td>
        <td class="text-center">{{ item.standingTable.goalsDiff }}</td>
        <td class="text-center">{{ item.standingTable.points }}</td>
      </tr>
    </table>
  </div>
</template>