import { gql } from '@apollo/client'
export interface GetCharacters {
  characters: {
    info: {
      count: number
      pages: number
      next: number
      prev: number
    }
    results: Characters[]
  }
}
export interface Characters {
  id: number
  name: string
  status: string
  species: string
  image: string
}
export const GET_CHARACTERS = gql`
  query getCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`
export interface Episode {
  id: number
  name: string
  episode: string
  characters?: Characters[]
}
interface Location {
  id: number
  name: string
  type: string
}
export interface Character {
  id: number
  name: string
  status: string
  species: string
  gender: string
  image: string
  created: string
  episode: Episode[]
  location: Location
}
export interface GetCharacterById {
  charactersByIds: Character[]
}
export const GET_CHARACTER_BY_ID = gql`
  query getCharacters($id: [ID!]!) {
    charactersByIds(ids: $id) {
      id
      name
      status
      species
      gender
      created
      episode {
        id
        name
        episode
      }
      location {
        id
        name
        type
      }
      image
    }
  }
`
export interface GetEpisodeById {
  episodesByIds: Episode[]
}
export const GET_EPISODE_BY_ID = gql`
  query getCharacters($id: [ID!]!) {
    episodesByIds(ids: $id) {
      name
      id
      episode
      characters {
        id
        name
        status
        species
        image
      }
    }
  }
`
