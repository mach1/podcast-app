import { debounce } from 'lodash'
import * as React from 'react'
import { AppBar, IconButton, Typography, Avatar, Grid, Slider } from '@material-ui/core'
import { PlayArrow, Pause, VolumeDown, VolumeUp } from '@material-ui/icons'
import styled from '@emotion/styled'
import { useMedia } from './mediaContext'
import { isArray } from 'lodash'

const Player: React.FC = () => {
  const { podcastEpisode, playing, togglePlaying, audio, volume, setVolume, duration, currentTime } = useMedia()
  const [sliderValue, setSliderValue] = React.useState(volume)
  const [timeSliderValue, setTimeSliderValue] = React.useState(currentTime)

  if (!podcastEpisode || !audio) return null

  const onChangeVolume = (event: React.ChangeEvent<unknown>, value: number | number[]) => {
    const newVolume = isArray(value) ? value[0] : value
    setSliderValue(newVolume)
    setVolume(newVolume)
  }

  const setCurrentTime = debounce(currentTime => (audio.currentTime = currentTime), 1000)

  const onChangeCurrentTime = (event: React.ChangeEvent<unknown>, value: number | number[]) => {
    const newCurrentTime = isArray(value) ? value[0] : value
    setTimeSliderValue(newCurrentTime)
    setCurrentTime(newCurrentTime)
  }

  return (
    <BottomAppBar color='default'>
      <EnhancedSlider value={timeSliderValue} max={duration} onChange={onChangeCurrentTime} />
      <Container>
        <LeftContent>
          <Avatar variant='square' src={podcastEpisode.meta.image} />
          <TextContainer>
            <Typography variant='body2'>{podcastEpisode.data.title}</Typography>
          </TextContainer>
        </LeftContent>
        <CenterContent>
          <EnhancedIconButton onClick={togglePlaying}>
            {playing ? <EnhancedPause /> : <EnhancedPlayArrow />}
          </EnhancedIconButton>
        </CenterContent>
        <RightContent>
          <VolumeControls container spacing={2}>
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs>
              <Slider value={sliderValue} onChange={onChangeVolume} aria-labelledby='continuous-slider' />
            </Grid>
            <Grid item>
              <VolumeUp />
            </Grid>
          </VolumeControls>
        </RightContent>
      </Container>
    </BottomAppBar>
  )
}

const EnhancedSlider = styled(Slider)`
  position: absolute;
  top: -13px;
`

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

const RightContent = styled.div`
  justify-content: flex-end;
  display: flex;
  padding-right: 20px;
`

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

const BottomAppBar = styled(AppBar)`
  top: auto;
  bottom: 0;
  height: 60px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100%;

  > * {
    flex: 1 1 0;
  }
`

const VolumeControls = styled(Grid)`
  max-width: 300px;
`

export default Player
