import * as React from 'react'
import { useParams } from 'react-router-dom'
import { fetchCollectionById, fetchFeed } from '../../api'
import { List, ListSubheader, Box, Typography, Avatar, Grid, withWidth, isWidthDown } from '@material-ui/core'
import { ApiFeedResponse, ApiSearchResult } from '@podcast/types'
import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import FeedItem from './FeedItem'

type Props = {
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Feed: React.FC<Props> = ({ width }) => {
  const theme = useTheme()
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

  const isMobile = isWidthDown('sm', width)

  const title = (
    <React.Fragment>
      <Typography variant={isMobile ? 'body1' : 'h5'}>{feed.meta.title}</Typography>
      <Typography color='textSecondary' paragraph variant={isMobile ? 'body2' : 'body1'}>
        {feed.meta.author}
      </Typography>
    </React.Fragment>
  )

  const description = (
    <Typography paragraph variant='body2'>
      {feed.meta.description}
    </Typography>
  )

  return (
    <React.Fragment>
      <Box>
        {isMobile ? (
          <PaddedContainer>
            <PodcastContainer container>
              <Grid item md={2} xs={3}>
                <PodcastImage variant='square' src={feed.meta.image} />
              </Grid>
              <PodcastDetails item md={10} xs={9}>
                {title}
              </PodcastDetails>
            </PodcastContainer>
            <PodcastContainer container>{description}</PodcastContainer>
          </PaddedContainer>
        ) : (
          <PaddedContainer>
            <PodcastContainer container>
              <Grid item md={2} xs={3}>
                <PodcastImage variant='square' src={feed.meta.image} />
              </Grid>
              <PodcastDetails item md={10} xs={9}>
                {title}
                {description}
              </PodcastDetails>
            </PodcastContainer>
          </PaddedContainer>
        )}
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
  flex-wrap: nowrap;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    align-items: flex-start;
  }
`

const PaddedContainer = styled.div`
  ${PodcastContainer}:not(:last-child) {
    padding-bottom: ${({ theme }) => theme.spacing(1)}px;
  }

  ${({ theme }) => css`
    padding: ${theme.spacing(3)}px ${theme.spacing(2)}px;
  `}
`

const PodcastImage = styled(Avatar)`
  width: 100%;
  height: 100%;

  img {
    object-fit: contain;
  }
`

const PodcastDetails = styled(Grid)`
  ${({ theme }) => theme.breakpoints.up('sm')} {
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding-left: ${({ theme }) => theme.spacing(1)}px;
  }
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

export default withWidth()(Feed)
