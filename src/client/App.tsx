import { debounce } from 'lodash'
import * as React from 'react'
import { Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from '@emotion/react'
import TopBar from './TopBar'
import SearchResults from './Search/SearchResults'
import { fetchSearchResults } from './api'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const theme = createMuiTheme()

export const App: React.FC = () => {
  const [results, setResults] = React.useState([])

  const onSearchChange = debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const response = await fetchSearchResults({ term: event.target.value, media: 'podcast' })
    const {
      json: { results },
    } = response
    setResults(results)
  }, 1000)

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Container>
          <TopBar onSearchChange={onSearchChange} />
          <Router>
            <Switch>
              <Route path='/'>
                <SearchResults results={results} />
              </Route>
            </Switch>
          </Router>
        </Container>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}
