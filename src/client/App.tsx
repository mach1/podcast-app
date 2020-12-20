import { debounce } from 'lodash'
import * as React from 'react'
import { Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from '@emotion/react'
import TopBar from './TopBar'
import SearchResults from './SearchResults'
import { fetchSearchResults } from './api'

const theme = createMuiTheme()

export const App: React.FC = () => {
  const [results, setResults] = React.useState([])

  const onSearchChange = debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const response = await fetchSearchResults(encodeURIComponent(event.target.value))
    const {
      json: { results },
    } = response
    setResults(results)
  }, 200)

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Container>
          <TopBar onSearchChange={onSearchChange} />
          <SearchResults results={results} />
        </Container>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}
