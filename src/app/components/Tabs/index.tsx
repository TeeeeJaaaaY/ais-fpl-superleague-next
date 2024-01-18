'use client';
import { useState } from 'react';

import { FplLeagueData } from '../../types';

import Table from '../Table';


export default function Tabs({ eastData, westData } : {
  eastData: FplLeagueData,
  westData: FplLeagueData,
}) {
  const [activeTab, setActiveTab] = useState('East');

  const tabStyles = 'cursor-pointer py-2 px-4 text-gray-500 border-b-8';
  const activeStyles = tabStyles + ' text-green-500 border-green-500';

  console.log(westData);
  console.log(eastData);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  }

  return (
    <article className='container md-4'>
      <ul className="flex justify-center items-center md-2 space-x-4 mb-4">
        <li
        className={activeTab === 'East' ? activeStyles : tabStyles}
        onClick={() => handleTabClick('East')}
        >
          East
        </li>
        <li
        className={activeTab === 'West' ? activeStyles : tabStyles}
        onClick={() => handleTabClick('West')}
        >
          West
        </li>
      </ul>

      <section className="w-100 p-16 text-center mx-auto">
        {activeTab === 'East' && (
          <div className="">
            <Table standings={eastData.standings} entries={eastData.league_entries} />
          </div>
        )}
        
        {activeTab === 'West' && (
          <div className="">
            <Table standings={westData.standings} entries={westData.league_entries} />
          </div>
        )}
      </section>
    </article>
  )
}