import { debounce } from 'lodash'
import * as React from 'react'
import { AppBar, Toolbar, InputBase, Typography, Container } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import styled from '@emotion/styled'
import { createMuiTheme, ThemeProvider as MuiThemeProvider, fade } from '@material-ui/core/styles'
import { ThemeProvider } from '@emotion/react'

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
          <AppBarContainer>
            <AppBar position='static'>
              <EnhancedToolbar>
                <Title>Podcasts</Title>
                <SearchContainer>
                  <SearchIconContainer>
                    <SearchIcon />
                  </SearchIconContainer>
                  <StyledInput placeholder='Search...' onChange={onSearchChange} />
                </SearchContainer>
              </EnhancedToolbar>
            </AppBar>
          </AppBarContainer>
        </Container>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

const AppBarContainer = styled.div`
  flex-grow: 1;
`

const EnhancedToolbar = styled(Toolbar)`
  justify-content: space-between;
`

const SearchContainer = styled.div`
  ${({ theme }) => `
    position: relative;
    border-radius: ${theme.shape.borderRadius}px; 
    background-color: ${fade(theme.palette.common.white, 0.15)};
    &:hover {
      background-color: ${fade(theme.palette.common.white, 0.25)};
    }
    margin-right: ${theme.spacing(2)}px;
    margin-left: 0;
    width: 100%;
    ${theme.breakpoints.up('sm')} {
      margin-left: ${theme.spacing(3)}px;
      width: auto;
    }
  `}
`

const StyledInput = styled(InputBase)`
  ${({ theme }) => `
    input {
      color: inherit;
      padding: ${theme.spacing(1, 1, 1, 0)};
      padding-left: calc(1em + ${theme.spacing(4)}px);
      transition: ${theme.transitions.create('width')};
      width: 100%;
      ${theme.breakpoints.up('md')} {
        width: 12ch;
        &:focus {
          width: 20ch;
        }
      }
    }
  `}
`

const SearchIconContainer = styled(SearchIcon)`
  ${({ theme }) => `
    padding: ${theme.spacing(0, 2)};
    height: 100%;
    position: absolute;
    pointer-events: none;
    display: flex;
    alignItems: center;
    justifyContent: center;
  `}
`

const Title = styled(Typography)`
  ${({ theme }) => `
    display: none;
    ${theme.breakpoints.up('sm')} {
      display: block;
    },
  `}
`
