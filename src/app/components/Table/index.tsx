'use client'
import React, { useEffect, useState } from 'react';

import { Standing } from '../../types';

import styles from './table.module.css';

export default function Table({standings}: {
    standings: Standing[],
  }
){
  const [sortedStandings, setSortedStandings] = useState<Standing[]>(standings);
  const [order, setOrder] = useState<'points' | 'score'>('points');

  useEffect(() => {
    setSortedStandings([...standings]);
  }, [standings])

  const handleSort = (type: 'points' | 'score') => {
    let sortedData = [...standings];

    sortedData.sort((a, b) => {
      switch(type) {
        case 'score':
          return b.points_for - a.points_for;
        case 'points':
          return b.total - a.total;
        default:
          return b.total - a.total;
      }
    });

    setSortedStandings(sortedData);
    setOrder(type)
  }

  return (
    <div className={styles.root + ' mb-24'}>
      <table className='w-full text-left table-auto min-w-max text-xs md:text-base'>
        <thead className={styles.tableHead}>
          <tr>
            <th>Pos.</th>
            <th>Team</th>
            <th>W</th>
            <th>L</th>
            <th>D</th>
            <th
              onClick={() => handleSort('score')}
              className={order === 'score' ? 'text-green-500 border-white-500' : 'cursor-pointer hover:text-green-500'}
            >
              +
            </th>
            <th
              onClick={() => handleSort('points')}
              className={order === 'points' ? 'text-green-500 border-white-500' : 'cursor-pointer hover:text-green-500'}
            >
              Pts
            </th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {sortedStandings && sortedStandings.map((row: Standing, i: number) => (
            <tr key={row.league_entry}>
              <td>{i + 1}</td>
              <td>{row.teamName}<br />{row.playerName}</td>
              <td>{row.matches_won}</td>
              <td>{row.matches_lost}</td>
              <td>{row.matches_drawn}</td>
              <td>{row.points_for}</td>
              <td>{row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
