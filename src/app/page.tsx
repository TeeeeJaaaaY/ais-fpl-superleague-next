import Tabs from './components/Tabs';

import './globals.css';

async function getData(id: string) {
  const res = await fetch(`https://draft.premierleague.com/api/league/${id}/details`);

  if ( !res.ok ) {
    console.error('data not found')
    throw new Error('Data not found');
  }

  const data = await res.json();

  return { data }
} 

export default async function Home() {
  try {
    const [east, west] = await Promise.all([
      getData(process.env.EAST_ID as string),
      getData(process.env.WEST_ID as string),
    ]);

    console.log('East League: ', east.data.league);
    console.log('West League: ', west.data.league);


    return (
      <main className="flex min-h-screen flex-col items-center justify-between pt-16 md:p-24">
        <Tabs eastData={east.data} westData={west.data} />
      </main>
    )
  } catch(error) {
    console.error('Error fetching data from FPL api: ', error);
    throw new Error('Error fetching data from FPL api');
  } 
}
