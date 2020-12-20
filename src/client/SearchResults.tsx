import * as React from 'react'
import { SearchResult } from './api'

interface Props {
  results: SearchResult[]
}
const SearchResults = ({ results }: Props): React.ReactElement => {
  return (
    <div>
      {results.map((result, i) => (
        <div key={i}>{result.artistName}</div>
      ))}
    </div>
  )
}

export default SearchResults
