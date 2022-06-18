export interface ISport24CompetitionsResponce {
  items: ISport24Competition[];
}
export interface ISport24Competition {
  id: number;
  urn: string;
  title: string;
  sport: ISport24Sport;
  titleShort: string;
  image: string;
  pageBackground: string;
  mobileBackground?: string;
  leagueType: string;
  region: ISport24Region;
}
interface ISport24Region {
  iso: string;
  title: string;
  thumbnail?: string;
}
interface ISport24Sport {
  id: number;
  title: string;
  name: string;
  urn: string;
  color: string;
  image: string;
  sportImage: string;
  mobileBackground: string;
}

export interface ISport24CompetitionReviewResponce {
  header: ISport24CompetitionHeader;
  materials: {  items: []; };
  topNews: {  items: []; };
  allNews: {  items: []; };
  sports: {};
  tags: {};
  infoTags: ISport24CompetitionInfoTags[];
  videos: {  items: []; };
  tabs: ['calendar', 'review', 'statistics', 'teams'];
  stages: {
    items: ISport24CompetitionStages[];
    actualId: number;
  };
}
export interface ISport24CompetitionHeader {
  id: number;
  urn: string;
  title: string;
  titleShort: string;
  longTitle: string;
  sport: ISport24Sport;
  image: string;
  pageBackground: string;
  mobileBackground: string;
  leagueType: string;
  seasons: ISport24TournamentSeason[];
  officialSite: string;
}
export interface ISport24CompetitionStages extends ISport24CompetitionStagesGroups {
  stageType: 'LEAGUE' | 'CUP';
}
export interface ISport24CompetitionStagesGroups {
  id: number;
  titleRu: string;
  priority: number;
  system: boolean;
}
export interface ISport24CompetitionInfoTags {
  id: number;
  oldId: string;
  editDate: number;
  creationDate: number;
  published: boolean;
  archived: boolean;
  title: string;
  urn: string;
  imageUri: string;
  logoImageUri: string;
  sportId: number;
  tagType: string;
  description: any[];
}
export interface ISport24TournamentSeason {
  id: number;
  urn: string;
  title: string;
  year: string;
  actual: boolean;
}

export interface ISport24CompetitionStandingLeagueResponce {
  '@type': string;
  items: ISport24StandingItem[];
  events: { [key: number]: ISport24EventMatch };
  participants: { [key: number]: ISport24StandingParticipant; };
  stage: ISport24CompetitionStages;
  stageGroups: { [key: number]:ISport24CompetitionStagesGroups; };
}
export interface ISport24CompetitionStandingCupResponce {
  '@type': string;
  cupRounds: ISport24StandingCupRounds[];
  participants: { [key: number]: ISport24StandingParticipant; };
  stage: ISport24CompetitionStages;
}
interface ISport24StandingParticipant {
  '@type': string;
  national: boolean;
  areaDto: {
    titleRu: string;
    alpha2: string;
    alpha3: string;
    frontConfig: { '@class': string; logos: { default: string; }; };
  };
  frontConfig: {
    '@class': string;
    logos: { default: string; };
    color: string;
    mobileBackgrounds: { default: string; };
    siteBackgrounds: { default: string; };
  };
  id: number;
  urn: string;
  titleRu: string;
  titleRuShort: string;
  virtual: boolean;
  cityTitleRu:string;
}
interface ISport24StandingItem {
  stageGroupId: number;
  participantId: number;
  eventIds: number[];
  standingTable: ISport24StandingTable;
  outcome?: string;
  outcomeColor?: string;
}
interface ISport24StandingTable {
  win: number;
  draw: number;
  loss: number;
  rank: number;
  change: number;
  played: number;
  points: number;
  goalsFor: number;
  goalsDiff: number;
  goalsAgainst: number;
}
interface ISport24EventMatch {
  seasonId: number;
  competitors: ISport24EventCompetitorsMatch[],
  stageIds: { id: number; groupIds: number[] }[],
  id: number;
  urn: string;
  startTime: number;
  finishTime: number;
  confirmedTime: boolean;
  technical: boolean;
  titleRu: string;
  titleRuShort: string;
  eventStatus: {
    titleRu: string;
    id: string;
    commonStatus: string;
    titleRuShort: string;
    live: boolean;
    ended: boolean;
    notStarted: boolean;
    frontConfig: {
      '@class': string;
      text: boolean;
      time: boolean;
      scores: boolean;
    }
  },
  roundDto: { titleRu: string; priority: number; periodUrn: string; },
  priority: number;
  frontConfig: { '@type': string; attendance: number; neutralVenue: boolean; channels: { country: string; name: string; }[] },
  eventType: { frontConfig: { '@class': string; config: []; }; urn: string; titleRu: string; };
  medalEvent: boolean;
}
interface ISport24EventCompetitorsMatch {
  participantId: number;
  priority: number;
  results: {
    value: number;
    valueType: string;
    summaryType: string;
    periodType: string;
    periodName: string;
    summaryTitle: string;
    periodTitle: string;
    periodPriority: number;
  }[];
  place: number;
}

interface ISport24StandingCupRounds {
  roundTitle: string;
  roundPriority: number;
  eventGroups: { events: ISport24EventMatch[]; wins: { participantId: number; wins: number; }[] }[];
}