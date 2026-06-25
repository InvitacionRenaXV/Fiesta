import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import DressCode from './components/DressCode';
import Gift from './components/Gift';
import Playlist from './components/Playlist';
import Teens from './components/Teens';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import Gallery from './components/Gallery';
import Reveal from './components/Reveal';
import Preloader from './components/Preloader';
import appStyles from './App.module.css';

export default function App() {
  const isTeens = new URLSearchParams(window.location.search).has('teens');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const finishLoading = () => {
      setIsLoading(false);
      // Eliminamos el componente del DOM después de la animación de fadeOut
      setTimeout(() => setShowPreloader(false), 800);
    };

    if (document.readyState === 'complete') {
      // Si el navegador ya terminó de cargar, salimos tras un breve delay estético
      setTimeout(finishLoading, 1000);
    } else {
      const handleLoad = () => setTimeout(finishLoading, 1000);
      window.addEventListener('load', handleLoad);

      // Seguridad: Si después de 5 segundos no cargó todo, forzamos la entrada
      const fallback = setTimeout(finishLoading, 5000);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  return (
    <>
      {showPreloader && <Preloader fadeOut={!isLoading} />}
      <div className={appStyles.noiseOverlay} aria-hidden="true" />
      <MusicPlayer isTeens={isTeens} isConfirmationOpen={isConfirmationOpen || isPlaylistOpen} />
      <Hero />
      <Reveal>
        <Countdown />
      </Reveal>
      <Reveal>
        <EventDetails
          isTeens={isTeens}
          isConfirmationOpen={isConfirmationOpen}
          setIsConfirmationOpen={setIsConfirmationOpen}
        />
      </Reveal>
      {isTeens && (
        <Reveal>
          <Teens />
        </Reveal>
      )}
      <Reveal>
        <DressCode />
      </Reveal>
      <Reveal>
        <Gift />
      </Reveal>
      <Reveal>
        <Gallery />
      </Reveal>
      <Reveal excludeSparks={true}>
        <Playlist
          isTeens={isTeens}
          isPlaylistOpen={isPlaylistOpen}
          setIsPlaylistOpen={setIsPlaylistOpen}
        />
      </Reveal>
      <Reveal>
        <Footer
          setIsConfirmationOpen={setIsConfirmationOpen}
          setIsPlaylistOpen={setIsPlaylistOpen}
        />
      </Reveal>
    </>
  );
}
