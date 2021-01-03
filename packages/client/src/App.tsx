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

const theme = createMuiTheme()

export const App: React.FC = () => {
  return (
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
            `}
          />
          <MediaProvider>
            <EnhancedContainer>
              <Provider store={store}>
                <Router>
                  <TopBar />
                  <Player />
                  <Switch>
                    <Route path='/feed/:feedId'>
                      <Feed />
                    </Route>
                    <Route path='/'>
                      <SearchResults />
                    </Route>
                  </Switch>
                </Router>
              </Provider>
            </EnhancedContainer>
          </MediaProvider>
        </StylesProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

const EnhancedContainer = styled(Container)`
  padding-top: 64px;
`
