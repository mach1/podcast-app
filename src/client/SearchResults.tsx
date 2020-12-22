import styled from '@emotion/styled'
import * as React from 'react'
import { SearchResult } from './api'
import { Grid, Card, CardMedia, CardContent, Typography } from '@material-ui/core'

interface Props {
  results: SearchResult[]
}
const SearchResults = ({ results }: Props): React.ReactElement => {
  return (
    <Root>
      <Grid container spacing={3}>
        {results.map((result, i) => (
          <Grid key={i} item xs={6}>
            <EnhancedCard>
              <EnhancedCardMedia image={result.artworkUrl100} />
              <ContentContainer>
                <EnhancedCardContent>
                  <Typography variant='h5'>{result.collectionName}</Typography>
                  <Typography variant='subtitle1'>{result.artistName}</Typography>
                </EnhancedCardContent>
              </ContentContainer>
            </EnhancedCard>
          </Grid>
        ))}
      </Grid>
    </Root>
  )
}

const Root = styled.div`
  padding-top: ${({ theme }) => theme.spacing(3)}px;
`

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

export default SearchResults
