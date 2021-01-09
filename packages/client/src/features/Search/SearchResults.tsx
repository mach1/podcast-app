import styled from '@emotion/styled'
import * as React from 'react'
import { Grid, withWidth, isWidthDown } from '@material-ui/core'
import { useSelector } from 'react-redux'
import SearchResult from './SearchResult'
import { getSearchResults } from '../../store/search/selectors'

type Props = {
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const SearchResults: React.FC<Props> = ({ width }) => {
  const searchResults = useSelector(getSearchResults)
  const isMobile = isWidthDown('sm', width)

  return (
    <Root>
      <Grid container spacing={isMobile ? 2 : 3}>
        {searchResults.map((result, i) => (
          <Grid key={i} item md={6} xs={12}>
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

export default withWidth()(SearchResults)
