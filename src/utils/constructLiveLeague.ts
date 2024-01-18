import { Entry, FplLeagueData, LiveLeague, Standing } from '../app/types';

export default function constructLiveLeague(leagueData: FplLeagueData): LiveLeague {
  const { league, league_entries, standings } = leagueData;

  const newStandings: Standing[] = standings.map((row: Standing) => {
    const player: Entry | undefined = league_entries.find((player: Entry) => row.league_entry === player.id);

    if (player) {
      return {
        ...row,
        teamName: player.entry_name,
        playerName: player.player_first_name
      }
    }

    return row;
  });

  return {
    leagueName: league.name,
    leagueId: league.id,
    standings: newStandings
  }
}