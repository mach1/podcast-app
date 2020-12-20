import { debounce } from 'lodash'
import * as React from 'react'
import { Container } from '@material-ui/core'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from '@emotion/react'
import TopBar from './TopBar'

const theme = createMuiTheme()

export const App: React.FC = () => {
  const [result, setResult] = React.useState('')

  const onSearchChange = debounce(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const response = await fetch('/search?term=' + encodeURIComponent(event.target.value))
    const json = await response.json()
    setResult(JSON.stringify(json))
  }, 200)

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Container>
          <TopBar onSearchChange={onSearchChange} />
        </Container>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}
