export default async function getFplData(id: string) {
  const res = await fetch(`https://draft.premierleague.com/api/league/${id}/details`);

  if ( !res.ok ) {
    console.error('data not found')
    throw new Error('Data not found');
  }

  const data = await res.json();

  return { data }
} 