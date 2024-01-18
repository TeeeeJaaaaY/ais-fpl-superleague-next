import React from 'react';

import { Entry, Standing } from '../../types';

import styles from './table.module.css';

function getTeamName(id: number, entries: Entry[]): Entry | null {
  const player = entries.find(entry => entry.id === id)

  if (player) {
    return player;
  } else {
    return null;
  }
}

export default function Table({standings}: {
  standings: Standing[],
}) {

  return (
    <div className={styles.root}>
      <table className='w-full text-left table-auto min-w-max text-xs md:text-base'>
        <thead className={styles.tableHead}>
          <tr>
            <th>Pos.</th>
            <th>Team</th>
            <th>W</th>
            <th>L</th>
            <th>D</th>
            <th>+</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {standings && standings.map((row: Standing, i: number) => (
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
