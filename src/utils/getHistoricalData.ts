import players from '../data/players.json';
import seasons from '../data/seasons.json';
import tables from '../data/tables.json';

import { HistoricalPlayer, HistoricalTable, LiveLeague, Standing } from '../app/types';

/**
 * Get the player from historical data using either historical playerID or the FPL Entry ID.
 * @param id - The historical player ID or FPL Entry ID to search for.
 * @returns - A HistoricalPlayer object if found, or null if not found.
 */
export function getHistoricalPlayer(id: number): HistoricalPlayer|undefined {
  const player = players.find((player) => player.pid === id || player.fpl_entry_id === id);
  return player;
}

export function getSeasons() {
  return seasons;
}

export function getSeasonYear(id: number) {
  const season = seasons.find((season) => season.id === id);

  return season ? season.year : 'Year not found';
}

/**
 * Retrieves Historical data and formats it into an array of LiveLeague objects.
 * LiveLeague objects contain information about the season, league ID, and standings
 * of each team in the league.
 * @returns An array of LiveLeague objects, each representing a season's league data in the same format FPL returns.
 */
export function getTables(): LiveLeague[] {
  const liveLeagues: LiveLeague[] = [];
  const combinedHistory: LiveLeague = {
    leagueName: 'Combined History',
    leagueId: 99999,
    standings: []
  }

  tables.forEach((table) => {
    const standings: Standing[] = table.teams.map((team) => ({
      last_rank: 0,
      league_entry: team.pid,
      matches_drawn: team.draws,
      matches_lost: team.losses,
      matches_played: team.draws + team.losses + team.wins,
      matches_won: team.wins,
      points_against: 0,
      points_for: team.totalScore,
      rank: 0,
      rank_sort: 0,
      total: team.totalPoints,
      teamName: getHistoricalPlayer(team.pid)?.teamName || '',
      playerName: getHistoricalPlayer(team.pid)?.name || '',
    })).sort((a, b) => {
      return b.total - a.total;
    });

    combinedHistory.standings = combineAllHistoricalData(table, combinedHistory.standings);

    liveLeagues.push({
      leagueName: `Season Ending ${getSeasonYear(table.sid)}`,
      leagueId: table.sid,
      standings,
    });
  });

  const sortedHistory: Standing[] = combinedHistory.standings.sort((a, b) => {
    return b.total - a.total
  })

  liveLeagues.push({
    ...combinedHistory,
    standings: sortedHistory
  });

  return liveLeagues;
}

/**
 * This function is to be added,
 * I am considering calling this function within the getTables
 * and adding the combined league data to the LiveLeagues Data type
 * Rather than a separate reducer here.
 */
export default function combineAllHistoricalData(table: HistoricalTable, totals: Standing[]) {
  table.teams.forEach((team) => {
    const entryExists = totals.find((entry) => team.pid == entry.league_entry);

    if (entryExists) {
      entryExists.points_for = entryExists.points_for + team.totalScore;
      entryExists.total = entryExists.total + team.totalPoints;
      entryExists.matches_drawn = entryExists.matches_drawn + team.draws;
      entryExists.matches_lost = entryExists.matches_lost + team.losses;
      entryExists.matches_won = entryExists.matches_won + team.wins
      entryExists.matches_played = entryExists.matches_played + (team.wins + team.draws + team.losses);
    } else {
      totals.push({
        last_rank: 0,
        league_entry: team.pid,
        matches_drawn: team.draws,
        matches_lost: team.losses,
        matches_played: team.draws + team.losses + team.wins,
        matches_won: team.wins,
        points_against: 0,
        points_for: team.totalScore,
        rank: 0,
        rank_sort: 0,
        total: team.totalPoints,
        teamName: getHistoricalPlayer(team.pid)?.teamName || '',
        playerName: getHistoricalPlayer(team.pid)?.name || '',
      });
    }
  })

  return totals;
}