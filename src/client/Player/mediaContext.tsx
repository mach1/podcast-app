import * as React from 'react'
import { PodcastEpisode } from '../../types'
import { debounce } from 'lodash'

interface ContextType {
  podcastEpisode: PodcastEpisode | null
  setPodcastEpisode: (value: PodcastEpisode) => void
  audio: HTMLAudioElement | null
  playing: boolean
  togglePlaying: () => void
  volume: number
  setVolume: (volume: number) => void
  currentTime: number
  duration: number
}

const MediaContext = React.createContext<ContextType | null>(null)

const useMedia = (): ContextType => {
  const context = React.useContext(MediaContext)
  if (!context) {
    throw new Error(`useMedia must be used within a MediaProvider`)
  }
  return context
}

type Props = {
  children: React.ReactNode
}
const MediaProvider: React.FC<Props> = ({ children }) => {
  const [podcastEpisode, setPodcastEpisodeState] = React.useState<PodcastEpisode | null>(null)
  const [audio] = React.useState<HTMLAudioElement>(new Audio())
  const [currentTime, setCurrentTimeState] = React.useState(0)
  const [duration, setDurationState] = React.useState(0)
  const [playing, setPlayingState] = React.useState<boolean>(false)
  const [volume, setVolumeState] = React.useState(30)

  React.useEffect(() => {
    audio.volume = 30 / 100
    audio.autoplay = true
    audio.addEventListener('play', () => setPlayingState(true))
    audio.addEventListener('pause', () => setPlayingState(false))
    audio.addEventListener('timeupdate', () => debounce(() => setCurrentTimeState(audio.currentTime), 100))
    audio.addEventListener('durationchange', () => setDurationState(audio.duration))
  }, [])

  const setPodcastEpisode = (episode: PodcastEpisode) => {
    setPodcastEpisodeState(episode)
    audio.pause()
    audio.src = episode.data.enclosure.url
  }

  const togglePlaying = () => {
    if (!audio) return

    if (audio.paused) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  const setVolume = debounce((newVolume: number) => {
    setVolumeState(newVolume)
    if (audio) {
      audio.volume = newVolume / 100
    }
  }, 50)

  return (
    <MediaContext.Provider
      value={{
        podcastEpisode,
        setPodcastEpisode,
        audio,
        playing,
        togglePlaying,
        volume,
        setVolume,
        currentTime,
        duration,
      }}
    >
      {children}
    </MediaContext.Provider>
  )
}

export { MediaProvider, useMedia }
