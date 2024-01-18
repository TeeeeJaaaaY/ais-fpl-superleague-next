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

export interface FplLeagueData {
  league: object
  league_entries: Entry[]
  matches: Match[]
  standings: Standing[]
}