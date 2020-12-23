import { debounce } from 'lodash'
import * as React from 'react'
import { Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider, Global, css } from '@emotion/react'
import TopBar from './TopBar'
import SearchResults from './Search/SearchResults'
import { fetchSearchResults } from './api'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Feed from './Feed/Feed'

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
        <Global
          styles={css`
            html,
            body {
              margin: 0 !important;
              padding: 0 !important;
            }
            h1 {
              margin-top: 0;
            }
            a {
              color: inherit;
              text-decoration: inherit;
            }
          `}
        />
        <Container>
          <TopBar onSearchChange={onSearchChange} />
          <Router>
            <Switch>
              <Route path='/feed/:feedId'>
                <Feed />
              </Route>
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
