import * as React from 'react'
import { PodcastEpisode, ApiSearchResult } from '../../types'
import { ListItem, ListItemText, Typography, Divider, Avatar, ListItemAvatar, IconButton } from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'
import styled from '@emotion/styled'

type Props = {
  collection: ApiSearchResult
  item: PodcastEpisode
}

const FeedItem: React.FC<Props> = ({ item, collection }) => {
  const { data } = item
  const description = data.description.replace(/<(.|\n)*?>/g, '')
  const onClickPlay = () => {
    console.log('play')
  }

  return (
    <React.Fragment>
      <EnhancedListItem button>
        <ListItemAvatar>
          <Avatar variant='square' src={collection.artworkUrl100} />
        </ListItemAvatar>
        <ListItemText primary={data.title} secondary={<Typography variant='body2'>{description}</Typography>} />
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

export default FeedItem
