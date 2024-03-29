'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppData } from '../types';
import getFplData from '../../utils/getFplData';
import constructLiveLeague from '../../utils/constructLiveLeague';
import mergeLeagues from '../../utils/mergeLeagues';

type FplDataContextProviderProps = {
  children: React.ReactNode;
}

type FplDataContext = {
  fplData: AppData | null;
  setFplData: React.Dispatch<React.SetStateAction<AppData | null>>;
}

const FplDataContext = createContext<FplDataContext | null>(null);

export default function FplDataContextProvider({ children }: FplDataContextProviderProps) {
  const [fplData, setFplData] = useState<AppData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eastLeague, westLeague] = await Promise.all([
          getFplData('east'),
          getFplData('west'),
        ]);

        const eastStandings = constructLiveLeague(eastLeague.data);
        const westStandings = constructLiveLeague(westLeague.data);

        const mergedStandings = mergeLeagues(eastStandings.standings, westStandings.standings);

        const fetchedLiveLeagues = [eastStandings, westStandings, mergedStandings];

        setFplData((prevData) => ({
          ...prevData,
          liveLeagues: fetchedLiveLeagues,
        }));
      } catch (error) {
        console.error('Error fetching data from FPL api: ', error);
        throw new Error('Error fetching data from FPL api');
      }
    }
    
    fetchData();
  }, []);

  return (
    <FplDataContext.Provider
      value={{
        fplData,
        setFplData
      }}
    >
      {children}
    </FplDataContext.Provider>
  )
}

export function useAppData() {
  const context = useContext(FplDataContext);

  if (!context) {
    throw new Error('FPL App Data cannot be accessed from outside of the FplContextProvider');
  }

  return context;
}