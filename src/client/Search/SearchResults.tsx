import styled from '@emotion/styled'
import * as React from 'react'
import { ApiSearchResult } from '../../types'
import { Grid } from '@material-ui/core'
import SearchResult from './SearchResult'

interface Props {
  results: ApiSearchResult[]
}

const SearchResults = ({ results }: Props): React.ReactElement => {
  return (
    <Root>
      <Grid container spacing={3}>
        {results.map((result, i) => (
          <Grid key={i} item xs={6}>
            <SearchResult searchResult={result} />
          </Grid>
        ))}
      </Grid>
    </Root>
  )
}

const Root = styled.div`
  padding-top: ${({ theme }) => theme.spacing(3)}px;
`

export default SearchResults
