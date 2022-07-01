<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFetch } from '@vueuse/core';
import {
  ISport24CompetitionReviewResponce,
  ISport24CompetitionStandingLeagueResponce,
  ISport24CompetitionStandingCupResponce
} from '@interfaces/sport24.interface';

type TLEAGUEORCUP = ISport24CompetitionStandingLeagueResponce | ISport24CompetitionStandingCupResponce;

const IMG_URL = import.meta.env.VITE_IMG_URL;

const props = defineProps({ view: String })

const table = ref<ISport24CompetitionStandingLeagueResponce | null>(null);
const playoff = ref<ISport24CompetitionStandingCupResponce | null>(null);
const activeBlock = ref(0);
const activeRound = ref('');
const activeSeason = ref('');
const winsTeam = ref<{ [key: number]: string }>({});

function tableType(standing: TLEAGUEORCUP): standing is ISport24CompetitionStandingLeagueResponce {
  return (standing as ISport24CompetitionStandingLeagueResponce).stage.stageType === 'LEAGUE';
}

const urlSCompetition = computed(() => `/api/competition/${props.view}/${activeSeason.value}`);
const { data: tournament, onFetchFinally  } = useFetch(urlSCompetition, { method: 'GET' }, { refetch: true }).json<ISport24CompetitionReviewResponce>();
onFetchFinally(() => (activeBlock.value = tournament.value?.stages.actualId || 0));
const urlStanding = computed(() => `/api/standing/${activeBlock.value}/`);
const { data: standing, onFetchResponse  } = useFetch(urlStanding, { method: 'GET' }, { refetch: true, immediate: false }).json<TLEAGUEORCUP>();
onFetchResponse(() => getStanding());

const getStanding = () => {
  playoff.value = null;
  table.value = null;
  if (standing.value && tableType(standing.value)) {
    table.value = standing.value;
  } else if (standing.value && !tableType(standing.value)) {
    activeRound.value = standing.value.cupRounds[0].roundTitle;
    playoff.value = standing.value;
    const lenCupRounds = standing.value.cupRounds.length - 1;
    standing.value.cupRounds.forEach((r, i) => {
      const { roundTitle } = r;
      r.eventGroups.forEach(e => {
        winsTeam.value[e.wins[0].participantId] = roundTitle;
        winsTeam.value[e.wins[1].participantId] = roundTitle;
        if (i === lenCupRounds) {
          const winTeam = e.wins.find(t => t.wins);
          winTeam && (winsTeam.value[winTeam.participantId] = 'Победитель');
        }
      })
    })
  }
}

const sortCompetitors = (arr: any[], condition = false) => {
  const newArr = [...arr];
  return newArr.sort((a, b) => {
    if (condition) {
      return (b.priority - a.priority)
    } else {
      return (a.priority - b.priority)
    }
  })
}

const getSlugImg = (key: number, data: TLEAGUEORCUP) => (data.participants[key].frontConfig.logos.default || '').replace('500_500.png', '30_30.png');
// const getSlugForImg = (key: number) => playoff.value && (playoff.value.participants[key].frontConfig.logos.default || '').replace('500_500.png', '30_30.png');
</script>

<template>
  <div v-if="tournament" class="flex flex-col items-center">
    <img class="h-24 w-24" :src="IMG_URL + tournament.header.image" alt="" srcset="">
    <h1><b>{{ (tournament.header).title }}</b></h1>
    <nav class="flex w-full justify-between text-center px-6">
      <div
        @click="activeBlock = item.id"
        v-for="item in tournament.stages.items"
        :class="[(activeBlock === item.id) && 'text-red-500 border-b-red-500', `w-1/${tournament.stages.items.length}`]"
        class="p-2 block grow border-b-2"
      >
        {{ item.titleRu }}
      </div>
    </nav>
    <template v-if="table" v-for="item in table.stageGroups">
      <h3 v-if="Object.keys(table.stageGroups).length > 1" class="mt-4">{{ item.titleRu }}</h3>
      <table class="px-6 w-full text-left border-spacing-y-2 border-separate table-auto">
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
            <img class="h-4 w-4 mr-2" :src="IMG_URL + getSlugImg(team.participantId, table)">
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
      <nav class="flex w-full justify-between mt-4 text-center px-6">
        <div
          v-for="round in playoff.cupRounds"
          class="p-2 block border-b-2 grow"
          @click="activeRound = round.roundTitle"
          :class="(activeRound === round.roundTitle) && 'text-red-500 border-b-red-500'"
        >
          {{ round.roundTitle }}
        </div>
      </nav>
      <div v-if="playoff" class="flex mt-4 w-full">
        <template v-show="round.roundTitle === activeRound" v-for="round in playoff.cupRounds">
          <table v-if="round.roundTitle === activeRound" class="w-full text-left border-spacing-y-2 table-auto">
            <thead>
              <tr>
                <th class="pl-6 py-2 border-b border-b-gray-300" scope="col">Team</th>
                <th class="py-2 border-b border-b-gray-300 text-center w-14" scope="col"></th>
                <th class="py-2 border-b border-b-gray-300 text-center w-18" scope="col"></th>
              </tr>
            </thead>
            <tr v-for="math in round.eventGroups" class="border-b border-b-gray-300">
              <td class="w-full flex items-center py-2 pl-6">
                <template v-for="(event, i) in math.events">
                  <div v-if="i === 0" class="mr-auto">
                    <div
                      v-for="competitor in sortCompetitors(event.competitors)"
                      class="flex items-center"
                      :class="(winsTeam[competitor.participantId] !== round.roundTitle) && 'font-bold'"
                    >
                      <img
                        v-if="getSlugImg(competitor.participantId, playoff)"
                        class="h-auto mr-1"
                        style="width: 24px;height: 24px;"
                        :src="IMG_URL + getSlugImg(competitor.participantId, playoff)"
                      >
                      <svg v-else width="24" height="24" style="color: #ddd;" viewBox="0 0 100 100"><path d="M50.045 0L12 6.997v54.591c0 4.202 1.882 8.74 5.604 13.493 3.3 4.205 7.971 8.511 13.883 12.8 7.381 5.336 14.905 9.31 18.558 11.119 3.659-1.81 11.183-5.782 18.562-11.119 5.916-4.288 10.58-8.594 13.877-12.8 3.725-4.759 5.613-9.29 5.613-13.493V6.998L50.045 0z" fill="currentColor" fill-rule="nonzero"></path></svg>
                      <div class="truncate" :class="(winsTeam[competitor.participantId] !== round.roundTitle) && 'font-bold'">{{ playoff.participants[competitor.participantId].titleRu }}</div>
                    </div>
                  </div>
                </template>
              </td>
              <td v-for="(event, i) in math.events" class="text-center py-2 relative pr-6" :class="[(i === 0) && 'align-top', (i === 1) && 'align-bottom']">
                <div
                  v-if="i === 0" v-for="competitor in sortCompetitors(event.competitors)"
                  :class="(competitor.place === 1) && 'font-bold'"
                >
                  <template v-if="competitor.results[0].periodName === 'normaltime_and_overtime'">{{ competitor.results[0].value }}</template>
                </div>
                <div v-if="i === 1" class="flex justify-center relative">
                  <div>
                    <div v-for="competitor in sortCompetitors(event.competitors, true)" :class="(competitor.place === 1) && 'font-bold'">
                      <template v-if="competitor.results[0].periodName === 'normaltime_and_overtime'">{{ competitor.results[0].value }}</template>
                    </div>
                  </div>
                </div>
                <div class="absolute flex flex-col justify-center inset-y-0 right-0 mr-4">
                  <div
                    v-for="competitor in sortCompetitors(event.competitors, !!i)"
                    class="text-gray-400 text-xs"
                    :class="(competitor.place === 1) && 'font-bold'"
                  >
                    <template v-if="competitor.results[1] && competitor.results[1].periodName === 'penalties'">{{ competitor.results[1].value }}</template>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </template>
      </div>
    </template>
  </div>
</template>