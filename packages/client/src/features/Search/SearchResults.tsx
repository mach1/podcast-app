import styled from '@emotion/styled'
import * as React from 'react'
import { Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import SearchResult from './SearchResult'
import { getSearchResults } from '../../store/search/selectors'

const SearchResults = (): React.ReactElement => {
  const searchResults = useSelector(getSearchResults)
  return (
    <Root>
      <Grid container spacing={3}>
        {searchResults.map((result, i) => (
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
