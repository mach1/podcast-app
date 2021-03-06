import { debounce } from 'lodash'
import * as React from 'react'
import { AppBar, IconButton, Typography, Avatar, Grid, Slider, withWidth, isWidthDown } from '@material-ui/core'
import { PlayArrow, Pause, VolumeDown, VolumeUp, Forward30, Replay30 } from '@material-ui/icons'
import styled from '@emotion/styled'
import { useMedia } from './mediaContext'
import { isArray } from 'lodash'

type Props = {
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Player: React.FC<Props> = ({ width }) => {
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

  const onClickReplay = () => {
    const newCurrentTime = audio.currentTime - 30
    audio.currentTime = newCurrentTime
    setTimeSliderValue(newCurrentTime)
  }

  const onClickForward = () => {
    const newCurrentTime = audio.currentTime + 30
    audio.currentTime = newCurrentTime
    setTimeSliderValue(newCurrentTime)
  }

  const isMobile = isWidthDown('sm', width)

  return (
    <BottomAppBar color='default'>
      <EnhancedSlider value={timeSliderValue} max={duration} onChange={onChangeCurrentTime} />
      <Container>
        <LeftContent>
          <Avatar variant='square' src={podcastEpisode.image} />
          {!isMobile && (
            <TextContainer>
              <Typography variant='body2'>{podcastEpisode.title}</Typography>
            </TextContainer>
          )}
        </LeftContent>
        <CenterContent>
          <EnhancedIconButton onClick={onClickReplay}>
            <Replay30 />
          </EnhancedIconButton>
          <EnhancedIconButton onClick={togglePlaying}>
            {playing ? <EnhancedPause /> : <EnhancedPlayArrow />}
          </EnhancedIconButton>
          <EnhancedIconButton onClick={onClickForward}>
            <Forward30 />
          </EnhancedIconButton>
        </CenterContent>
        <RightContent>
          {!isMobile && (
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
          )}
        </RightContent>
      </Container>
    </BottomAppBar>
  )
}

const EnhancedSlider = styled(Slider)`
  position: absolute;
  top: -13px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    top: -20px;
  }
`

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding-left: ${({ theme }) => theme.spacing(1)}px;
  }
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
  margin: 0 10px;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: 0;
  }
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

export default withWidth()(Player)
