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
  const [audio, setAudioState] = React.useState<HTMLAudioElement | null>(null)
  const [playing, setPlayingState] = React.useState<boolean>(false)
  const [volume, setVolumeState] = React.useState(30)

  const setPodcastEpisode = (episode: PodcastEpisode) => {
    setPodcastEpisodeState(episode)
    if (audio) {
      audio.pause()
      audio.src = ''
      audio.load()
    }
    const newAudio = new Audio(episode.data.enclosure.url)
    newAudio.volume = volume / 100
    newAudio.autoplay = true
    setPlayingState(true)
    setAudioState(newAudio)
  }

  const togglePlaying = () => {
    if (!audio) return

    if (audio.paused) {
      audio.play()
      setPlayingState(true)
    } else {
      audio.pause()
      setPlayingState(false)
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
      value={{ podcastEpisode, setPodcastEpisode, audio, playing, togglePlaying, volume, setVolume }}
    >
      {children}
    </MediaContext.Provider>
  )
}

export { MediaProvider, useMedia }
