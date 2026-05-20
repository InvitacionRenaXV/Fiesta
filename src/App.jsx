import { useState } from 'react';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import DressCode from './components/DressCode';
import Gift from './components/Gift';
import Playlist from './components/Playlist';
import Teens from './components/Teens';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import SuccessMessage from './components/SuccessMessage';

export default function App() {
  const isTeens = new URLSearchParams(window.location.search).has('teens');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SuccessMessage />
      <MusicPlayer isTeens={isTeens} isModalOpen={isModalOpen} />
      <Hero />
      <Countdown />
      <EventDetails isTeens={isTeens} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <DressCode />
      <Gift />
      <Playlist isTeens={isTeens} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      {isTeens && <Teens />}
      <Footer />
    </>
  );
}
