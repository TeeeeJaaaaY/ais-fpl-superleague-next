'use client';
import { getSeasonYear, getTables } from '../../utils/getHistoricalData';
import { useEffect, useState } from 'react';
import { LiveLeague } from '../types';
import Table from '../components/Table';

export default function Historical() {
  const [seasonSelected, setSeasonSelected] = useState<LiveLeague | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [tableData, setTableData] = useState<LiveLeague[] | null>(null)

  useEffect(() => {
    setTableData(getTables());
  }, []);

  const handleSelect = () => {
    setOpen(open ? false : true);
  }

  const handleSeasonChoice = (id: number) => {
    const season = tableData?.find((table) => table.leagueId === id);
    
    setSeasonSelected(season || null) 
    setOpen(false);
  }

  return (
    <main className="flex flex-col items-center justify-between pt-16 md:p-24">
      
      {!tableData && <p>Loading...</p>}

      {tableData && (
        <div className="relative w-11/12 text-black pb-4">
          <button
            className={`${open ? 'ring-blue-600' : 'ring-gray-300'} flex w-full items-center justify-between rounded bg-white p-2 ring-1`}
            onClick={handleSelect}
            >
              <span>{seasonSelected ? seasonSelected.leagueName : 'Select season'}</span>
              <p>{open ? '˄' : '˅'}</p>
          </button>

          <ul className={`${!open ? 'hidden' : ''} z-2 absolute mt-1 w-full rounded bg-gray-50 ring-1 ring-gray-300`}>
            {tableData && tableData.map((table) => (
              <li
                key={table.leagueId}
                className="cursor-pointer select-none p-2 hover:bg-gray-200"
                onClick={() => handleSeasonChoice(table.leagueId)}
              >
                {table.leagueName}
              </li>
            ))}
          </ul>
        </div>
      )}
      

      {tableData && seasonSelected && (
        <Table standings={seasonSelected.standings} />
      )}
    </main>
  )
}