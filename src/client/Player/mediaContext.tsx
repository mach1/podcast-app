import * as React from 'react'
import { PodcastEpisode } from '../../types'

interface ContextType {
  media: PodcastEpisode | null
  setMedia: (value: PodcastEpisode) => void
  audio: HTMLAudioElement | null
  togglePlaying: () => void
  playing: boolean
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
  const [media, setMedia] = React.useState<PodcastEpisode | null>(null)
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = React.useState<boolean>(false)

  const set = (episode: PodcastEpisode) => {
    setMedia(episode)
    const newAudio = new Audio(episode.data.enclosure.url)
    setAudio(newAudio)
  }

  const togglePlaying = () => {
    if (!audio) return

    if (audio.paused) {
      audio.play()
      setPlaying(true)
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <MediaContext.Provider value={{ audio, media, setMedia: set, togglePlaying, playing }}>
      {children}
    </MediaContext.Provider>
  )
}

export { MediaProvider, useMedia }
