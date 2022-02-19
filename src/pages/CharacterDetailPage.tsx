import { useQuery } from '@apollo/client'
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import {
  Character,
  Characters,
  GetCharacterById,
  GET_CHARACTER_BY_ID,
} from '../utils/query'
import './CharactersDetailPage.css'

import { useDispatch, useSelector } from 'react-redux'
import { addToFavorite, selectFavoriteItems } from '../store/favorite'
import CharacterDetailPageComponent from '../components/CharacterDetailPageComponent'

const CharacterDetailPage: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const params: { characterId: string } = useParams()
  const id = params.characterId
  const [character, setCharacter] = useState<Character | undefined>()
  const { data, error } = useQuery<GetCharacterById>(GET_CHARACTER_BY_ID, {
    variables: { id: id },
  })
  const favoriteStore = useSelector(selectFavoriteItems)

  const isFavoriteCharacter = favoriteStore.find(
    (item) => item.character.id === character?.id
  )
  let like = null
  let dislike = null
  if (isFavoriteCharacter) {
    like = isFavoriteCharacter.like
    dislike = isFavoriteCharacter.dislike
  }

  useEffect(() => {
    setCharacter(data?.charactersByIds[0])
  }, [data])
  const onEpisodeClick = (episodeId: number) => {
    history.push(`/home/episode/${episodeId}`)
  }

  const onLikeOrDislikeBtnClick = (character: Character, like: boolean) => {
    const updateCharacter: Characters = {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      image: character.image,
    }
    dispatch(addToFavorite({ item: updateCharacter, favorite: like }))
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{character ? character.name : `Character detail`}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {error && <div className="spinner">{error.message}</div>}
        {character ? (
          <CharacterDetailPageComponent
            character={character}
            onEpisodeClick={onEpisodeClick}
            onLikeOrDislikeBtnClick={onLikeOrDislikeBtnClick}
            like={like}
            dislike={dislike}
          />
        ) : (
          <div className="spinner">
            <IonSpinner name="circles" />
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}

export default CharacterDetailPage
