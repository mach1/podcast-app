import * as React from 'react'
import { AppBar, IconButton, Typography, Avatar } from '@material-ui/core'
import { PlayArrow, Pause } from '@material-ui/icons'
import styled from '@emotion/styled'
import { useMedia } from './mediaContext'

const Player: React.FC = () => {
  const { media, audio, togglePlaying, playing } = useMedia()

  if (!media || !audio) return null

  return (
    <EnhancedAppBar color='default'>
      <LeftContent>
        <Avatar variant='square' src={media.meta.image} />
        <TextContainer>
          <Typography variant='body2'>{media.data.title}</Typography>
        </TextContainer>
      </LeftContent>
      <CenterContent>
        <EnhancedIconButton onClick={togglePlaying}>
          {playing ? <EnhancedPause /> : <EnhancedPlayArrow />}
        </EnhancedIconButton>
      </CenterContent>
      <RightContent>
        <div />
      </RightContent>
    </EnhancedAppBar>
  )
}

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
`

const TextContainer = styled.div`
  padding-left: 10px;
`

const CenterContent = styled.div`
  display: flex;
  justify-content: center;
`

const RightContent = styled.div``

const EnhancedPlayArrow = styled(PlayArrow)`
  width: 20px;
  height: 20px;
`

const EnhancedPause = styled(Pause)`
  width: 20px;
  height: 20px;
`

const EnhancedIconButton = styled(IconButton)`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
`

const EnhancedAppBar = styled(AppBar)`
  display: flex;
  align-items: center;
  flex-direction: row;
  top: auto;
  bottom: 0;
  height: 60px;

  > * {
    flex: 1 1 0;
  }
`

export default Player
