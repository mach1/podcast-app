import * as React from 'react'
import styled from '@emotion/styled'
import { Card, CardMedia, CardContent, CardActionArea, Typography, withWidth, isWidthDown } from '@material-ui/core'
import { ApiSearchResult } from '@podcast/types'
import { Link } from 'react-router-dom'

interface Props {
  searchResult: ApiSearchResult
  width: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const SearchResult = ({ searchResult, width }: Props): React.ReactElement => {
  const isMobile = isWidthDown('sm', width)

  return (
    <EnhancedCard>
      <EnhancedCardMedia image={searchResult.artworkUrl100} />
      <EnhancedCardActionArea>
        <Link to={`/feed/${searchResult.collectionId}`}>
          <ContentContainer>
            <EnhancedCardContent>
              <Title variant={isMobile ? 'subtitle1' : 'h5'}>{searchResult.collectionName}</Title>
              <Author variant={isMobile ? 'body2' : 'subtitle1'}>{searchResult.artistName}</Author>
            </EnhancedCardContent>
          </ContentContainer>
        </Link>
      </EnhancedCardActionArea>
    </EnhancedCard>
  )
}

const Title = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.common.black};
`

const Author = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down('sm')} {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const EnhancedCardActionArea = styled(CardActionArea)`
  min-width: 0;
`

const EnhancedCard = styled(Card)`
  display: flex;
  background-color: ${({ theme }) => theme.palette.background.default};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: ${({ theme }) => theme.spacing(1)}px;
    align-items: center;
  }
`

const EnhancedCardMedia = styled(CardMedia)`
  width: 100px;
  height: 100px;
  flex-shrink: 0;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 50px;
    height: 50px;
    margin-top: ${({ theme }) => theme.spacing(1)}px;
  }
`

const EnhancedCardContent = styled(CardContent)`
  flex: 1 0 auto;
  width: 100%;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 0 ${({ theme }) => theme.spacing(1)}px;
  }
`

const ContentContainer = styled.div`
  display: flex;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    ${EnhancedCardContent}:last-child {
      padding-bottom: 0;
    }
  }
`

export default withWidth()(SearchResult)
