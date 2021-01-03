import * as React from 'react'
import { useParams } from 'react-router-dom'
import { fetchCollectionById, fetchFeed } from '../../api'
import { List, ListSubheader, Box, Typography, Avatar, Grid } from '@material-ui/core'
import { ApiFeedResponse, ApiSearchResult } from '@podcast/types'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import FeedItem from './FeedItem'

const Feed: React.FC = () => {
  const { feedId } = useParams<{ feedId: string }>()

  const [collection, setCollection] = React.useState<ApiSearchResult | null>(null)
  const [feed, setFeed] = React.useState<ApiFeedResponse | null>(null)

  React.useEffect(() => {
    const fetch = async () => {
      const lookupResults = await fetchCollectionById({ id: feedId })
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
    <React.Fragment>
      <Box>
        <PodcastContainer container sm={12}>
          <Grid sm={2}>
            <PodcastImage variant='square' src={feed.meta.image} />
          </Grid>
          <PodcastDetails sm={10}>
            <Typography variant='h5'>{feed.meta.title}</Typography>
            <Typography color='textSecondary' paragraph variant='body1'>
              {feed.meta.author}
            </Typography>
            <Typography paragraph variant='body2'>
              {feed.meta.description}
            </Typography>
          </PodcastDetails>
        </PodcastContainer>
      </Box>
      <EnhancedList subheader={<EpisodesSubHeader>Episodes</EpisodesSubHeader>}>
        {feed.items.map((feedItem, i) => {
          return <FeedItem key={i} collection={collection} item={{ meta: feed.meta, data: feedItem }} />
        })}
      </EnhancedList>
    </React.Fragment>
  )
}

const PodcastContainer = styled(Grid)`
  ${({ theme }) => css`
    padding: ${theme.spacing(3)}px ${theme.spacing(2)}px;
    flex-wrap: nowrap;
  `}
`

const PodcastImage = styled(Avatar)`
  width: 100%;
  height: 100%;
`

const PodcastDetails = styled(Grid)`
  padding: ${({ theme }) => theme.spacing(2)}px;
`

const EpisodesSubHeader = styled(ListSubheader)`
  font-size: 1.5rem;
`

const EnhancedList = styled(List)`
  background-color: ${({ theme }) => theme.palette.background.paper};

  & > li:not(:first-child) {
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`

export default Feed
