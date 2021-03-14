import * as React from 'react'
import { Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'
import { ThemeProvider, Global, css } from '@emotion/react'
import TopBar from './TopBar'
import SearchResults from './features/Search/SearchResults'
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom'
import Feed from './features/Feed/Feed'
import styled from '@emotion/styled'
import Player from './features/Player/Player'
import { MediaProvider } from './features/Player/mediaContext'
import { Provider } from 'react-redux'
import store from './store'
import { ApolloClient, InMemoryCache, gql, ApolloProvider } from '@apollo/client'
import { debounce } from 'lodash'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

const theme = createMuiTheme()

export const App: React.FC = () => {
  const [searchText, setSearchText] = React.useState('')

  const onSearchChange = React.useMemo(
    () =>
      debounce((search: string) => {
        if (window.location.pathname !== '/') {
          window.location.pathname = '/'
        }

        setSearchText(search)
      }, 500),
    [],
  )

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <StylesProvider injectFirst>
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
                div {
                  box-sizing: border-box;
                }
              `}
            />
            <MediaProvider>
              <EnhancedContainer>
                <Provider store={store}>
                  <Router>
                    <TopBar onSearchChange={onSearchChange} />
                    <Player />
                    <Switch>
                      <Route path='/feed/:feedId'>
                        <Feed />
                      </Route>
                      <Route path='/'>
                        <SearchResults searchText={searchText} />
                      </Route>
                    </Switch>
                  </Router>
                </Provider>
              </EnhancedContainer>
            </MediaProvider>
          </StylesProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  )
}

const EnhancedContainer = styled(Container)`
  padding-top: 64px;
`
