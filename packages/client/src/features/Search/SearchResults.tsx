import styled from '@emotion/styled'
import * as React from 'react'
import { Grid, withWidth, isWidthDown } from '@material-ui/core'
import SearchResult from './SearchResult'
import { SearchData, SearchVars, SEARCH } from '../../data/search/query'
import { useQuery } from '@apollo/client'

interface Props {
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  searchText: string
}

const SearchResults: React.FC<Props> = ({ width, searchText }) => {
  const isMobile = isWidthDown('sm', width)
  if (!searchText) return null

  const { loading, data } = useQuery<SearchData, SearchVars>(SEARCH, { variables: { term: searchText } })

  if (loading) return null

  return (
    <Root>
      <Grid container spacing={isMobile ? 2 : 3}>
        {data.search.map((result, i) => (
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
