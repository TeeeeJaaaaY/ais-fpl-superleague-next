export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const leagueCode = searchParams.get('leagueCode');

  if (!leagueCode) {
    console.error('League Code not provided, unable to fetch a league id to query FPL API');
    throw new Error('League Code not provided, unable to fetch a league id to query FPL API');
  }

  const id = process.env[leagueCode];

  try {
    const res = await fetch(`https://draft.premierleague.com/api/league/${id}/details`);

    if ( !res.ok ) {
      console.error('data not found')
      throw new Error('Data not found');
    }

    const data = await res.json();

    return Response.json({ data })
  } catch (error) {
    console.error('Failed to fetch data from the FPL API: ', error);
    throw new Error('Failed to fetch data from the FPL API');
  }
}