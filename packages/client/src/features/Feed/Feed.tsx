import * as React from 'react'
import { useParams } from 'react-router-dom'
import { List, ListSubheader, Box, Typography, Avatar, Grid, withWidth, isWidthDown } from '@material-ui/core'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import FeedItem from './FeedItem'
import { GetByIdData, GetByIdVars, GET_PODCAST_BY_ID } from '../../data/search/query'
import { useQuery } from '@apollo/client'

type Props = {
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const Feed: React.FC<Props> = ({ width }) => {
  const { feedId } = useParams<{ feedId: string }>()

  const { loading, data } = useQuery<GetByIdData, GetByIdVars>(GET_PODCAST_BY_ID, {
    variables: { id: +feedId },
  })

  if (loading) return null

  const { getPodcastById: podcast } = data

  const isMobile = isWidthDown('sm', width)

  const title = (
    <React.Fragment>
      <Typography variant={isMobile ? 'body1' : 'h5'}>{podcast.title}</Typography>
      <Typography color='textSecondary' paragraph variant={isMobile ? 'body2' : 'body1'}>
        {podcast.author}
      </Typography>
    </React.Fragment>
  )

  const description = (
    <Typography paragraph variant='body2'>
      {podcast.feed.description}
    </Typography>
  )

  return (
    <React.Fragment>
      <Box>
        {isMobile ? (
          <PaddedContainer>
            <PodcastContainer container>
              <Grid item md={2} xs={3}>
                <PodcastImage variant='square' src={podcast.image} />
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
                <PodcastImage variant='square' src={podcast.image} />
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
        {podcast.feed.episodes.map((episode, i) => {
          return <FeedItem key={i} podcast={podcast} episode={episode} />
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
