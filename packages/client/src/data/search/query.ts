import { gql } from '@apollo/client'

export interface SearchResult {
  id: number
  author: string
  image: string
  title: string
  __typename: string
}

export type SearchData = {
  search: SearchResult[]
} | null

export interface SearchVars {
  term: string
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
