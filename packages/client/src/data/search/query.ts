import { gql } from '@apollo/client'

export interface SearchResult {
  id: number
  author: string
  image: string
  title: string
  feedUrl: string
  feed: {
    description: string
    episodes: Episode[]
  }
  __typename: string
}

export interface Episode {
  image: string
  title: string
  link: string
  description: string
  date: string
  length: string
  type: string
  url: string
}

export type SearchData = {
  search: SearchResult[]
} | null

export interface SearchVars {
  term: string
}

export interface GetByIdData {
  getPodcastById: SearchResult
}

export interface GetByIdVars {
  id: number
}

export const SEARCH = gql`
  query Search($term: String!) {
    search(term: $term) {
      id
      title
      author
      image
    }
  }
`

export const GET_PODCAST_BY_ID = gql`
  query GetPodcastById($id: ID!) {
    getPodcastById(id: $id) {
      id
      title
      author
      image
      feed {
        description
        episodes {
          image
          title
          link
          description
          date
          length
          type
          url
        }
      }
    }
  }
`
