import moment from 'moment'
import * as React from 'react'
import { PodcastEpisode, ApiSearchResult } from '../../types'
import { ListItem, ListItemText, Typography, Divider, Avatar, ListItemAvatar, IconButton } from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'
import styled from '@emotion/styled'
import { useMedia } from '../Player/mediaContext'

type Props = {
  collection: ApiSearchResult | null
  item: PodcastEpisode
}

const FeedItem: React.FC<Props> = ({ item, collection }) => {
  const { setPodcastEpisode } = useMedia()
  const { data } = item
  const description = data.description.replace(/<(.|\n)*?>/g, '')
  const onClickPlay = () => {
    setPodcastEpisode(item)
  }

  if (!collection) return null

  return (
    <React.Fragment>
      <EnhancedListItem button>
        <ListItemAvatar>
          <Avatar variant='square' src={collection.artworkUrl100} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography variant='caption'>{moment(data.date).format('MMM Do YYYY')}</Typography>
              <Typography variant='body1'>{data.title}</Typography>
            </React.Fragment>
          }
          secondary={
            <DescriptionText paragraph variant='body2'>
              {description}
            </DescriptionText>
          }
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

const DescriptionText = styled(Typography)`
  -webkit-line-clamp: 2;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
`

export default FeedItem
