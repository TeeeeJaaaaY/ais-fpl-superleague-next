'use client';
import { useState } from 'react';

import { LiveLeague } from '../../types';

import Table from '../Table';


export default function Tabs({ leagues } : {
  leagues: LiveLeague[],
}) {
  const [activeTab, setActiveTab] = useState(1);

  console.log(leagues);

  const tabStyles = 'cursor-pointer py-2 px-4 text-gray-500 border-b-8';
  const activeStyles = tabStyles + ' text-green-500 border-green-500';

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  }

  return (
    <article className='container md-4'>
      <ul className="flex justify-center items-center md-2 space-x-4 mb-4">
        {leagues && leagues.map(league => (
          <li
            key={league.leagueId}
            className={activeTab === league.leagueId ? activeStyles : tabStyles}
            onClick={() => handleTabClick(league.leagueId)}
          >
            {league.leagueName}
          </li>
        ))}
      </ul>

      <section className="w-100 md:p-16 text-center mx-auto">
        {leagues.map((league) => (
          <div key={league.leagueId} style={{ display: activeTab === league.leagueId ? 'block' : 'none' }}>
            <Table standings={league.standings} />
          </div>
        ))}
      </section>
    </article>
  )
}