import * as React from 'react'
import styled from '@emotion/styled'
import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@material-ui/core'
import { ApiSearchResult } from '@podcast/types'
import { Link } from 'react-router-dom'

interface Props {
  searchResult: ApiSearchResult
}

const SearchResult = ({ searchResult }: Props): React.ReactElement => {
  return (
    <EnhancedCard>
      <EnhancedCardMedia image={searchResult.artworkUrl100} />
      <CardActionArea>
        <Link to={`/feed/${searchResult.collectionId}`}>
          <ContentContainer>
            <EnhancedCardContent>
              <Typography variant='h5'>{searchResult.collectionName}</Typography>
              <Typography variant='subtitle1'>{searchResult.artistName}</Typography>
            </EnhancedCardContent>
          </ContentContainer>
        </Link>
      </CardActionArea>
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
  flex-shrink: 0;
`

const ContentContainer = styled.div`
  display: flex;
`

const EnhancedCardContent = styled(CardContent)`
  flex: 1 0 auto;
`

export default SearchResult
