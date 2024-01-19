'use client';
import Tabs from './components/Tabs';
import { useAppData } from './contexts/fplApi-context';

import './globals.css';

export default function Home() {
  const { fplData } = useAppData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16 md:p-24">
      {!fplData && <p>Loading...</p>}
      {fplData && (
        <Tabs leagues={fplData.liveLeagues} />
      )}
    </main>
  ) 
}
