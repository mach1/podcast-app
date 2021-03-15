import moment from 'moment'
import * as React from 'react'
import { ListItem, ListItemText, Typography, Divider, IconButton } from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'
import styled from '@emotion/styled'
import { useMedia } from '../Player/mediaContext'
import { SearchResult as Podcast, Episode } from '../../data/search/query'

type Props = {
  podcast: Podcast
  episode: Episode
}

const FeedItem: React.FC<Props> = ({ episode, podcast }) => {
  const { setPodcastEpisode } = useMedia()
  const description = episode.description.replace(/<(.|\n)*?>/g, '')
  const onClickPlay = () => {
    setPodcastEpisode(episode)
  }

  if (!podcast) return null

  return (
    <React.Fragment>
      <EnhancedListItem button>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant='caption'>{moment(episode.date).format('MMM Do YYYY')}</Typography>
              <Typography variant='body1'>{episode.title}</Typography>
            </React.Fragment>
          }
          secondary={<DescriptionText>{description}</DescriptionText>}
        />
        <EnhancedIconButton onClick={onClickPlay}>
          <EnhancedPlayArrow />
        </EnhancedIconButton>
      </EnhancedListItem>
      <Divider variant='inset' component='li' />
    </React.Fragment>
  )
}

const EnhancedPlayArrow = styled(PlayArrow)`
  display: none;
  width: 20px;
  height: 20px;
`

const EnhancedListItem = styled(ListItem)`
  &:hover ${EnhancedPlayArrow} {
    display: block;
  }
`

const EnhancedIconButton = styled(IconButton)`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
`

const DescriptionText = styled.span`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
`

export default FeedItem
