import Hero from './components/Hero'
import Countdown from './components/Countdown'
import EventDetails from './components/EventDetails'
import DressCode from './components/DressCode'
import Gift from './components/Gift'
import Playlist from './components/Playlist'
import Teens from './components/Teens'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'

const isTeens = new URLSearchParams(window.location.search).has('teens')

export default function App() {
  return (
    <>
      <MusicPlayer />
      <Hero />
      <Countdown />
      <EventDetails isTeens={isTeens}/>
      <DressCode />
      <Gift />
      <Playlist />
      {isTeens && <Teens />}
      <Footer />
    </>
  )
}
