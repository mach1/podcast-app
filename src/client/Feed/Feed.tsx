import * as React from 'react'
import { useParams } from 'react-router-dom'
import { fetchCollectionById, fetchFeed } from '../api'
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  ListItemAvatar,
  IconButton,
} from '@material-ui/core'
import { PlayArrow } from '@material-ui/icons'
import { ApiFeedResponse, ApiSearchResult } from 'src/types'
import styled from '@emotion/styled'

const Feed = (): React.ReactElement => {
  const { feedId } = useParams<{ feedId: string }>()

  const [collection, setCollection] = React.useState<ApiSearchResult | null>(null)
  const [feed, setFeed] = React.useState<ApiFeedResponse | null>(null)

  React.useEffect(() => {
    const fetch = async () => {
      const lookupResults = await fetchCollectionById({ id: +feedId })
      const collection = lookupResults.results[0]
      setCollection(collection)

      if (!collection) return

      const feed = await fetchFeed({ feedUrl: collection.feedUrl })
      setFeed(feed)
    }

    fetch()
  }, [feedId])

  if (!feed) return null

  return (
    <EnhancedList>
      {feed.items.map((feedItem, i) => {
        const description = feedItem.description.replace(/<(.|\n)*?>/g, '')
        return (
          <React.Fragment key={i}>
            <EnhancedListItem button>
              <ListItemAvatar>
                <Avatar variant='square' src={collection.artworkUrl100} />
              </ListItemAvatar>
              <ListItemText
                primary={feedItem.title}
                secondary={<Typography variant='body2'>{description}</Typography>}
              />
              <EnhancedIconButton>
                <EnhancedPlayArrow />
              </EnhancedIconButton>
            </EnhancedListItem>
            <Divider variant='inset' component='li' />
          </React.Fragment>
        )
      })}
    </EnhancedList>
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

const EnhancedList = styled(List)`
  background-color: ${({ theme }) => theme.palette.background.paper};
`
export default Feed
