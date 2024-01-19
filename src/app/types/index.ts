export type Entry = {
  entry_id: number;
  entry_name: string;
  id: number;
  joined_time: string;
  player_first_name: string;
  player_last_name: string;
  short_name: string;
  waiver_pick: number;
}

export type Standing = {
  last_rank: number;
  league_entry: number;
  matches_drawn: number;
  matches_lost: number;
  matches_played: number;
  matches_won: number;
  points_against: number;
  points_for: number;
  rank: number;
  rank_sort: number;
  total: number;
  teamName?: string;
  playerName?: string;
}

export type Match = {
  event: number;
  finished: boolean;
  league_entry_1: number;
  league_entry_1_points: number;
  league_entry_2: number;
  league_entry_2_points: number;
  started: true;
  winning_league_entry: number | null;
  winning_method: string | null;
}

export type League = {
  admin_entry: number;
  closed: boolean;
  draft_dt: string;
  draft_pick_time_limit: number;
  draft_status: string;
  draft_tz_show: string;
  id: number;
  ko_rounds: number
  make_code_public: boolean;
  max_entries: number;
  min_entries: number;
  name: string;
  scoring: string;
  start_event: number;
  stop_event: number;
  trades: string;
  transaction_mode: string;
  variety: string;
}

export type LiveLeague = {
  leagueName: string;
  leagueId: number;
  standings: Standing[]
}

export interface AppData {
  liveLeagues: LiveLeague[];
  historical?: [];
  players?: [];
}

export interface FplLeagueData {
  league: League
  league_entries: Entry[]
  matches: Match[]
  standings: Standing[]
}