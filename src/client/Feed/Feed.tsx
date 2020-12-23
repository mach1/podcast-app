import * as React from 'react'
import { useParams } from 'react-router-dom'
import { fetchCollectionById, fetchFeed } from '../api'
import { List } from '@material-ui/core'
import { ApiFeedResponse, ApiSearchResult } from 'src/types'
import styled from '@emotion/styled'
import FeedItem from './FeedItem'

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
        return <FeedItem key={i} collection={collection} item={{ meta: feed.meta, data: feedItem }} />
      })}
    </EnhancedList>
  )
}

const EnhancedList = styled(List)`
  background-color: ${({ theme }) => theme.palette.background.paper};
`
export default Feed
