import * as React from 'react'

import { useHistory } from 'react-router-dom'
import { debounce } from 'lodash'
import { AppBar, Toolbar, InputBase, Typography } from '@material-ui/core'
import { fade } from '@material-ui/core/styles'
import { Search, Clear } from '@material-ui/icons'
import styled from '@emotion/styled'
import { fetchResults } from './store/search/actions'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchResults } from './store/search/selectors'

const TopBar = (): React.ReactElement => {
  const dispatch = useDispatch()
  const history = useHistory()
  const searchResults = useSelector(getSearchResults)
  const [searchText, setSearchText] = React.useState('')
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  const debouncedFetch = React.useMemo(() => debounce(value => dispatch(fetchResults(value)), 500), [])

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setSearchText(value)
    debouncedFetch(value)
  }

  const onClickClear = () => {
    setSearchText('')
    console.log(searchInputRef)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  React.useEffect(() => {
    if (history.location.pathname !== '/') {
      history.push('/')
    }
  }, [searchResults])

  return (
    <AppBarContainer>
      <AppBar position='fixed' color='primary'>
        <EnhancedToolbar>
          <Title>Podcasts</Title>
          <SearchContainer>
            <SearchIcon />
            <StyledInput
              inputRef={searchInputRef}
              value={searchText}
              placeholder='Search...'
              onChange={onSearchChange}
              endAdornment={<ClearIcon onClick={onClickClear} />}
            />
          </SearchContainer>
        </EnhancedToolbar>
      </AppBar>
    </AppBarContainer>
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
        width: 15ch;
        &:focus {
          width: 23ch;
        }
      }
    }
  `}
`

const SearchIcon = styled(Search)`
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

const ClearIcon = styled(Clear)`
  ${({ theme }) => `
    path {
      color: ${fade(theme.palette.common.white, 0.25)};
    }
    padding: ${theme.spacing(0, 1)};
    height: 100%;
    position: absolute;
    right: 0;
    display: flex;
    alignItems: center;
    justifyContent: center;
    cursor: pointer;
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

export default TopBar
