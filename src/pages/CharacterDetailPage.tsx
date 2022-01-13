import { useQuery } from '@apollo/client'
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import {
  headsetOutline,
  thumbsDownOutline,
  thumbsUpOutline,
} from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import {
  Character,
  Characters,
  GetCharacterById,
  GET_CHARACTER_BY_ID,
} from '../utils/query'
import './CharactersDetailPage.css'
import moment from 'moment'
import CharactersPageComponent from '../components/CharactersPageComponent'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorite, selectFavoriteItems } from '../store/favorite'

const CharacterDetailPageComponent: React.FC<{
  character: Character
  onEpisodeClick: (id: number) => void
  onLikeOrDislikeBtnClick: (character: Character, like: boolean) => void
  like: boolean | null
  dislike: boolean | null
}> = ({
  character,
  onEpisodeClick,
  onLikeOrDislikeBtnClick,
  like,
  dislike,
}) => {
  return (
    <div className="character">
      <div className="character__img">
        <img src={character.image} alt={character.name} />
      </div>
      <div className="character__btns">
        <IonButton
          fill="clear"
          className="character__btns-favorite"
          onClick={onLikeOrDislikeBtnClick.bind(null, character, true)}
        >
          <IonIcon
            icon={thumbsUpOutline}
            slot="icon-only"
            style={{ color: like === true && 'red' }}
          ></IonIcon>
        </IonButton>
        <IonButton
          fill="clear"
          onClick={onLikeOrDislikeBtnClick.bind(null, character, false)}
        >
          <IonIcon
            icon={thumbsDownOutline}
            slot="icon-only"
            style={{ color: dislike === true && 'red' }}
          ></IonIcon>
        </IonButton>
      </div>
      <div className="character__content">
        <div className="character__content-text">
          Name: <h3>{character.name}</h3>
        </div>
        <div className="character__content-text">
          Gender:
          <h3>{character.gender}</h3>
        </div>
        <div className="character__content-text">
          Species:
          <h3>{character.species}</h3>
        </div>
        <div className="character__content-text">
          Status:
          <h3>{character.status}</h3>
        </div>
        <div className="character__content-text">
          Location:
          <h3> {character.location.name}</h3>
        </div>
        <div className="character__content-text">
          Created:
          <h3> {moment(character.created).format('DD.MM.YY')}</h3>
        </div>
      </div>
      <div className="character__episode">
        {character.episode.map((i) => (
          <IonCard
            key={i.id}
            className="character__episode-item"
            onClick={onEpisodeClick.bind(null, i.id)}
          >
            <h3>{i.episode}</h3>
            <h3>{i.name}</h3>
          </IonCard>
        ))}
      </div>
    </div>
  )
}

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
