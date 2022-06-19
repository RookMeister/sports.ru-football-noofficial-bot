<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ApiService from '@web/services/ApiService';
import { ISport24CompetitionReviewResponce, ISport24CompetitionStandingLeagueResponce, ISport24CompetitionStandingCupResponce } from '@web/interfaces/sport24.interface';

const tournament = ref<ISport24CompetitionReviewResponce | null>(null);
const table = ref<ISport24CompetitionStandingLeagueResponce | null>(null);
const playoff = ref<ISport24CompetitionStandingCupResponce | null>(null);
const activeBlock = ref(0);
const activeRound = ref('');
const winsTeam = ref<{ [key: number]: string }>({});

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
        standing.cupRounds.forEach((r, i) => {
          const { roundTitle } = r;
          r.eventGroups.forEach(e => {
            winsTeam.value[e.wins[0].participantId] = roundTitle;
            winsTeam.value[e.wins[1].participantId] = roundTitle;
            if (i === standing.cupRounds.length - 1) {
              const winTeam = e.wins.find(t => t.wins);
               winTeam && (winsTeam.value[winTeam.participantId] = 'Победитель');
            }
          })
        })
      }
    });
  }
}

const setActiveRound = (title: string) => activeRound.value = title;

onMounted( async () => {
  if (props.view) {
    try {
      const { data: info } = await ApiService.apiGetTournamentInfo(props.view);
      if (info.stages.actualId) {
        getStanding(info.stages.actualId)
        tournament.value = info;
      }
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
        class="p-2 block grow border-b-2"
      >
        {{ item.titleRu }}
      </div>
    </nav>
    <template v-if="table" v-for="item in table.stageGroups">
      <h3 v-if="Object.keys(table.stageGroups).length > 1" class="mt-4">{{ item.titleRu }}</h3>
      <table class="w-full text-left border-spacing-y-2 border-separate table-auto">
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
      <nav class="flex w-full justify-between mt-4 text-center">
        <div
          v-for="round in playoff.cupRounds"
          class="p-2 block border-b-2 grow"
          @click="setActiveRound(round.roundTitle)"
          :class="(activeRound === round.roundTitle) && 'text-red-500 border-b-red-500'"
        >
          {{ round.roundTitle }}
        </div>
      </nav>
      <div v-if="playoff" class="flex mt-4 w-full">
        <div v-for="round in playoff.cupRounds" v-show="round.roundTitle === activeRound" class="w-full flex gap-2 flex-col">
          <table v-for="round in playoff.cupRounds" v-show="round.roundTitle === activeRound" class="w-full text-left border-spacing-y-2 table-auto">
            <thead>
              <tr>
                <th class="py-2 border-b border-b-gray-300" scope="col">Team</th>
                <th class="py-2 border-b border-b-gray-300 text-center w-12" scope="col"></th>
                <th class="py-2 border-b border-b-gray-300 text-center w-12" scope="col"></th>
              </tr>
            </thead>
            <tr v-for="math in round.eventGroups" class="border-b border-b-gray-300">
              <td class="w-full flex items-center py-2">
                <template v-for="(event, i) in math.events">
                  <div v-if="i === 0" class="mr-auto">
                    <div
                      v-for="competitor in event.competitors.sort((a, b) => a.priority - b.priority)"
                      class="flex items-center"
                      :class="(winsTeam[competitor.participantId] !== round.roundTitle) && 'font-bold'"
                    >
                      <img class="h-4 w-4 mr-2" :src="'https://s74794.cdn.ngenix.net/m/' + playoff.participants[competitor.participantId].frontConfig.mobileBackgrounds.default" alt="" srcset="">
                      {{ playoff.participants[competitor.participantId].titleRu }}
                    </div>
                  </div>
                </template>
              </td>
              <td v-for="(event, i) in math.events" class="text-center py-2 relative" :class="[(i === 0) && 'align-top', (i === 1) && 'align-bottom']">
                <div
                  v-if="i === 0" v-for="competitor in event.competitors.sort((a, b) => a.priority - b.priority)"
                  :class="(competitor.place === 1) && 'font-bold'"
                >
                  <template v-if="competitor.results[0].periodName === 'normaltime_and_overtime'">{{ competitor.results[0].value }}</template>
                </div>
                <div class="absolute flex flex-col justify-center inset-y-0 right-0">
                  <div
                    v-if="i === 0"
                    v-for="competitor in event.competitors.sort((a, b) => a.priority - b.priority)"
                    class="text-gray-400 text-xs"
                    :class="(competitor.place === 1) && 'font-bold'"
                  >
                    <template v-if="competitor.results[1] && competitor.results[1].periodName === 'penalties'">{{ competitor.results[1].value }}</template>
                  </div>
                </div>
                <div v-if="i === 1" class="flex justify-center relative">
                  <div>
                    <div v-for="competitor in event.competitors.sort((a, b) => b.priority - a.priority)" :class="(competitor.place === 1) && 'font-bold'">
                      <template v-if="competitor.results[0].periodName === 'normaltime_and_overtime'">{{ competitor.results[0].value }}</template>
                    </div>
                  </div>
                  <div class="absolute flex flex-col justify-center inset-y-0 right-0">
                    <div
                      v-for="competitor in event.competitors.sort((a, b) => a.priority - b.priority)"
                      class="text-gray-400 text-xs"
                      :class="(competitor.place === 1) && 'font-bold'"
                    >
                      <template v-if="competitor.results[1] && competitor.results[1].periodName === 'penalties'">{{ competitor.results[1].value }}</template>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>