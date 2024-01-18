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

export default function Table({standings, entries}: {
  standings: Standing[],
  entries: Entry[],
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
          {standings && standings.map((row: Standing, i: number) => {
            let entry_name = 'Team not found';
            let player_first_name = 'Player not found';
            const  teamInfo = getTeamName(row.league_entry, entries);

            if (teamInfo !== null) {
              entry_name = teamInfo.entry_name;
              player_first_name = teamInfo.player_first_name;
            }

            return (
              <tr key={row.league_entry}>
                <td>{i + 1}</td>
                <td>{entry_name}<br />{player_first_name}</td>
                <td>{row.matches_won}</td>
                <td>{row.matches_lost}</td>
                <td>{row.matches_drawn}</td>
                <td>{row.points_for}</td>
                <td>{row.total}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
