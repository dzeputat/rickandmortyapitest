import { useQuery } from '@apollo/client'
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import CharactersPageComponent from '../components/CharactersPageComponent'
import { Episode, GetEpisodeById, GET_EPISODE_BY_ID } from '../utils/query'
import './EpisodePage.css'

const EpisodesPage: React.FC = () => {
  const params: { episodeId: string } = useParams()
  const history = useHistory()
  const id = +params.episodeId
  console.log(id)
  const [episode, setEpisode] = useState<Episode | undefined>()
  const { data, loading } = useQuery<GetEpisodeById>(GET_EPISODE_BY_ID, {
    variables: {
      id: id,
    },
  })
  useEffect(() => {
    setEpisode(data?.episodesByIds[0])
  }, [data])
  console.log(episode)
  const onCharacterClick = (id: number) => {
    history.push(`/home/characters/${id}`)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{episode ? episode.name : `Episode`}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {episode ? (
          <>
            <IonLabel className="title">Episode: {episode.episode}</IonLabel>
            <IonList>
              {episode.characters?.map((character) => (
                <CharactersPageComponent
                  key={character.id}
                  character={character}
                  onCharacterClick={onCharacterClick}
                />
              ))}
            </IonList>
          </>
        ) : (
          <div className="spinner">
            <IonSpinner name="circles" />
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}

export default EpisodesPage
