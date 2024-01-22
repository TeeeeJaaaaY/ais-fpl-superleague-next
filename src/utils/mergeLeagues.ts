import { LiveLeague, Standing } from '../app/types';

export default function mergeLeagues(firstLeague: Standing[], secondLeague: Standing[]): LiveLeague {
  const mergedLeagues = firstLeague.concat(secondLeague);

  mergedLeagues.sort((a, b) => b.total - a.total);

  const updatedMergedLeague = mergedLeagues.map((team, i) => ({
    ...team,
    rank: i + 1,
    rank_sort: i + 1,
  }));

  return {
    leagueName: 'East & West Combined',
    leagueId: 1,
    standings: updatedMergedLeague
  }
}