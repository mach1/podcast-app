import * as React from 'react'
import { AppBar, Toolbar, InputBase, TextField, Button, Container } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import styled from '@emotion/styled'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider } from '@emotion/react'

const theme = createMuiTheme()

export const App: React.FC = () => {
  const [search, setSearch] = React.useState('')
  const [result, setResult] = React.useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onClickSearch = async () => {
    const response = await fetch('/search?term=' + encodeURIComponent(search))
    const json = await response.json()
    setResult(JSON.stringify(json))
  }

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Container>
          <AppBar>
            <Toolbar>
              <div>
                <SearchIcon />
                <StyledInput placeholder='Search...' />
              </div>
            </Toolbar>
          </AppBar>
          <TextField placeholder='Search' onChange={onChange} />
          <Button variant='contained' onClick={onClickSearch}>
            Search
          </Button>
          <pre>
            <code>{result}</code>
          </pre>
        </Container>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

const StyledInput = styled(InputBase)`
  input {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`
