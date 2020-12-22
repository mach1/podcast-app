import * as React from 'react'
import styled from '@emotion/styled'
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core'
import { ApiSearchResult } from '../../types'
import { fetchFeed } from '../api'

interface Props {
  searchResult: ApiSearchResult
}

const SearchResult = ({ searchResult }: Props): React.ReactElement => {
  const onClick = async () => {
    const response = await fetchFeed({ feedUrl: searchResult.feedUrl })
    console.log(response)
  }

  return (
    <EnhancedCard onClick={onClick}>
      <EnhancedCardMedia image={searchResult.artworkUrl100} />
      <ContentContainer>
        <EnhancedCardContent>
          <Typography variant='h5'>{searchResult.collectionName}</Typography>
          <Typography variant='subtitle1'>{searchResult.artistName}</Typography>
        </EnhancedCardContent>
      </ContentContainer>
    </EnhancedCard>
  )
}

const EnhancedCard = styled(Card)`
  display: flex;
  background-color: ${({ theme }) => theme.palette.background.default};
`

const EnhancedCardMedia = styled(CardMedia)`
  width: 100px;
  height: 100px;
`

const ContentContainer = styled.div`
  display: flex;
`

const EnhancedCardContent = styled(CardContent)`
  flex: 1 0 auto;
`

export default SearchResult
