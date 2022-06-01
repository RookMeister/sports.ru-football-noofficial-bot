// MatchResponse
export type IDataMatches = {
  name: string;
  title: string;
  id: number;
  matches: ISportsMatchResponse[],
  matchesIds: string[];
}[]

export type IMatchesSaveAll = {
  name: string;
  title: string;
  id: number;
  matchesIds: string[];
}[]
export interface ISportsMatchResponse {
  id: number;
  sport_id: number;
  final_type_hockey: string;
  status: string;
  state_id: number;
  state: string;
  state_name: string;
  status_id: number;
  status_name: string;
  score: string;
  start_time: ISportsMatchTime;
  first_team: ISportsMatchTeam;
  second_team: ISportsMatchTeam;
  tournament: {
    id: number;
    name: string;
    season_id: number;
    stage_name: string;
    tag_url: string;
    has_table: boolean;
  };
  page_info: {
    mobile_url: string;
    desktop_url: string;
  };
  review?: IYouTubeVideo;
}
export interface IYouTubeVideo {
  videoId: string;
  url: string;
  date: string;
  dateDay: string;
  title: string;
  channelTitle: string;
}
interface ISportsMatchTeam {
  id: number;
  name: string;
  tag_id: number;
  tag_url: string;
  penalty_win: number;
  score: number;
  avatar: any;
  goals: {
    id: number;
    player_id: number;
    autogoal: number;
    penalty: number;
    name: string;
    full_name: string;
    tag_id: number;
    tag_url: string;
    minute: number;
    assist: {
      player_id: number;
      name: string;
      full_name: string;
      tag_id: number;
      tag_url: string;
    }[];
  }[];
  team_id: number;
  possession: number;
  shots_off_target: number;
  shots_on_target: number;
  shots_blocked: number;
  shots_woodwork: number;
  corners: number;
  penalties: number;
  fouls: number;
  yellow_cards: number;
  substitutions: number;
  red_cards: number;
  offsides: number;
  throw_ins: number;
  conceded_goals: number;
  attacks: number;
  dangerous_attacks: number;
  free_kicks: number;
  goal_kicks: number;
  win: number;
  shots_total: number;
  color1: string;
  color2: string;
  team_logo: string;
  goals_count: number;
}

// GoalsResponse
export interface ISportsGoalsResponse {
  url: string;
  avatar: { big_logo: string; logo: string; };
  first_team: ISportsGoalsTeam;
  second_team: ISportsGoalsTeam;
}
interface ISportsGoalsTeam {
  name: string;
  avatar: { big_logo: string; logo: string; };
  goals: {
    name: string;
    autogoal: boolean;
    penalty: boolean;
    action: boolean | string;
    minute: number;
    url: string;
    assists: string[];
  }[];
  score: number;
}

// TeaserResponse
export interface ISportsTeaserResponse {
  teaser: {
    match_center_link: string;
    match_center_yesterday_link: string;
    tournaments: ISportsTeaserTournament[];
  }
}
interface ISportsTeaserTournament {
  id: number;
  tag_id: number;
  name: string;
  country: string;
  stage: string;
  tag_url: string;
  sport: ISportsTournament;
  menu: { type: string; name: string; url: string; }[]
  matches: ISportsTeaserMatch[];
}
interface ISportsTeaserMatch {
  id: number;
  online_url: string;
  progress: number;
  status: {id: number; name: string; };
  score: string;
  start_time: ISportsMatchTime;
  first_team: ISportsTeaserTeam;
  second_team: ISportsTeaserTeam;
  tv: { name: string; icon: string; }[];
  is_live: boolean;
  show_winline_button: boolean;
  broadcast: { name: string; url: string; }[];
}
interface ISportsTeaserTeam {
  name: string;
  tag_id: number;
  goals: number[];
  flag_id: number;
  flag_country: string;
  logo: string;
  penalty: number;
  win: string;
}

// TournamentListResponse
export interface ISportsTournamentsListResponse { tournament_list: ISportsTournament[] };
interface ISportsTournament {
  id: number;
  name: string;
}

// TournamentTableResponse
export interface ISportsTournamentTableResponse {
  tournament_table: { group: ISportsTournament, list: ISportsTournamentTableList[]}[];
  sport_id: number;
  tournament_id: number;
  full_link: string;
};
interface ISportsTournamentTableList {
  place: number;
  team_info: ISportsTournamentTableListTeam;
  score: number;
  matches: number;
  color: string;
}
interface ISportsTournamentTableListTeam {
  id: number;
  name: string;
  tag: number;
  tag_url: string;
  flag:	{ flag_id: number; flag_country: string; };
}

// TournamentMatchesResponse
export interface ISportsTournamentMatchesResponse {
  match_list: { title: string; matches: ISportsTournamentMatchesItem[] }[];
  full_link: string;
}
interface ISportsTournamentMatchesItem {
  status_id: number;
  is_preview: number;
  base_url: string;
  start_time: ISportsMatchTime;
  is_only_day: number;
  sport_id: number;
  online_url: string;
  id: number;
  first_team: ISportsTournamentMatchesItemTeam;
  second_team: ISportsTournamentMatchesItemTeam;
}
interface ISportsTournamentMatchesItemTeam extends ISportsTournamentTableListTeam {
  goals: number;
  penalty: number;
}
interface ISportsMatchTime {
  type: string;
  timestamp: number;
  tolstoy: string;
  bunin: string;
  bulgakov: string;
  akhmatova: string;
  full: string;
  short_date: string;
  date: string;
  lermontov: string;
  full_day_of_week: string;
  short_day_of_week: string;
  time: string;
}

// TournamentPlayersStatResponse
export interface ISportsTournamentPlayersStatResponse {
  players_stat: {
    type: string;
    title: string;
    players: ISportsPlayer[];
    full_link: string;
  }[];
}
interface ISportsPlayer {
  id: number;
  name: string;
  tag_id: number;
  tag_url: string;
  place: number;
  flag:	{ flag_id: number; flag_country: string; flag_code: string; };
  avatar: { big_logo: string; logo: string; };
  team: ISportsTournamentTableListTeam;
  goals: number;
}