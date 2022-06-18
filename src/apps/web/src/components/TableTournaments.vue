<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ApiService from '@web/services/ApiService';
import { ISport24CompetitionReviewResponce, ISport24CompetitionStandingLeagueResponce, ISport24CompetitionStandingCupResponce } from '@web/interfaces/sport24.interface';

const tournament = ref<ISport24CompetitionReviewResponce | null>(null);
const table = ref<ISport24CompetitionStandingLeagueResponce | null>(null);
const playoff = ref<ISport24CompetitionStandingCupResponce | null>(null);
const activeBlock = ref(0);
const activeRound = ref('');

function tableType(standing: ISport24CompetitionStandingLeagueResponce | ISport24CompetitionStandingCupResponce): standing is ISport24CompetitionStandingLeagueResponce {
  return (standing as ISport24CompetitionStandingLeagueResponce).stage.stageType === 'LEAGUE';
}

const props = defineProps({
  view: String
})

const getStanding = (id: number) => {
  if (activeBlock.value !== id) {
    activeBlock.value = id;
    playoff.value = null;
    table.value = null;
    ApiService.apiGetTournamentStanding(id).then(({ data: standing }) => {
      if (tableType(standing)) {
        table.value = standing;
      } else {
        activeRound.value = standing.cupRounds[0].roundTitle;
        playoff.value = standing;
      }
    });
  }
}

const setActiveRound = (title: string) => activeRound.value = title;

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
      <div
        @click="getStanding(item.id)"
        v-for="item in tournament.stages.items"
        :class="(activeBlock === item.id) && 'text-red-500 border-b-red-500'"
        class="p-2 block grow border-b-2 font-medium"
      >
        {{ item.titleRu }}
      </div>
    </nav>
    <template v-if="table" v-for="item in table.stageGroups">
      <h3 v-if="Object.keys(table.stageGroups).length > 1" class="mt-6">{{ item.titleRu }}</h3>
      <table class="w-full text-sm text-left border-spacing-y-2 border-separate table-auto">
        <thead>
          <tr>
            <th class="py-2 border-b border-b-gray-300" scope="col">#</th>
            <th class="py-2 border-b border-b-gray-300" scope="col">Team</th>
            <th class="py-2 border-b border-b-gray-300 text-center w-6" scope="col">W</th>
            <th class="py-2 border-b border-b-gray-300 text-center w-6" scope="col">D</th>
            <th class="py-2 border-b border-b-gray-300 text-center w-6" scope="col">L</th>
            <th class="py-2 border-b border-b-gray-300 text-center w-8" scope="col">GD</th>
            <th class="py-2 border-b border-b-gray-300 text-center w-8" scope="col">PTS</th>
          </tr>
        </thead>
        <tr v-show="team.stageGroupId === item.id" v-for="team in table.items.sort((a: any, b: any) => a.standingTable.rank - b.standingTable.rank)" :key="team.participantId">
          <td>{{ team.standingTable.rank }}</td>
          <td class="w-32 flex items-center">
            <img class="h-4 w-4 mr-2" :src="'https://s74794.cdn.ngenix.net/m/' + table.participants[team.participantId].frontConfig.mobileBackgrounds.default" alt="" srcset="">
            <div class="truncate">{{ table.participants[team.participantId].titleRu }}</div>
          </td>
          <td class="text-center">{{ team.standingTable.win }}</td>
          <td class="text-center">{{ team.standingTable.draw }}</td>
          <td class="text-center">{{ team.standingTable.loss }}</td>
          <td class="text-center">{{ team.standingTable.goalsDiff }}</td>
          <td class="text-center">{{ team.standingTable.points }}</td>
        </tr>
      </table>
    </template>
    <template v-if="playoff">
      <nav class="flex w-full justify-between mt-6 text-center">
        <div
          v-for="round in playoff.cupRounds"
          class="p-2 block text-sm border-b-2 grow"
          @click="setActiveRound(round.roundTitle)"
          :class="(activeRound === round.roundTitle) && 'text-red-500 border-b-red-500'"
        >
          {{ round.roundTitle }}
        </div>
      </nav>
      <div v-if="playoff" class="flex mt-6 w-full text-sm">
        <div v-for="round in playoff.cupRounds" v-show="round.roundTitle === activeRound" class="w-full flex gap-2 flex-col">
          <div v-for="math in round.eventGroups" class="flex">
            <template v-for="(event, i) in math.events">
              <div v-if="i === 0" class="flex flex-col mr-auto">
                <div
                  v-for="competitor in event.competitors.sort((a, b) => a.priority - b.priority)"
                  class="flex items-center"
                  :class="math.wins.find((t) => t.participantId === competitor.participantId)?.wins && 'font-bold'"
                >
                  <img class="h-4 w-4 mr-2" :src="'https://s74794.cdn.ngenix.net/m/' + playoff.participants[competitor.participantId].frontConfig.mobileBackgrounds.default" alt="" srcset="">
                  {{ playoff.participants[competitor.participantId].titleRu }}
                </div>
              </div>
            </template>
            <div v-for="(event, i) in math.events" class="flex">
              <div v-if="i === 0" class="flex flex-col mr-2">
                <div v-for="competitor in event.competitors.sort((a, b) => a.priority - b.priority)" :class="(competitor.place === 1) && 'font-bold'" >
                  {{ competitor.results[0].value }}
                </div>
              </div>
              <div v-if="i === 1" class="flex flex-col">
                <div v-for="competitor in event.competitors.sort((a, b) => b.priority - a.priority)" :class="(competitor.place === 1) && 'font-bold'" >
                  {{ competitor.results[0].value }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>