export default async function getFplData(league: string) {
  const leagueCode = league.toUpperCase() + '_ID'

  const res = await fetch(`/api/fpl/?leagueCode=${leagueCode}`);

  if ( !res.ok ) {
    console.error('data not found')
    throw new Error('Data not found');
  }

  const fplDataResponse = await res.json();

  const data = fplDataResponse.data

  return { data }
} 