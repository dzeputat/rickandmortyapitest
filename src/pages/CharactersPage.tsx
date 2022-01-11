import { useQuery } from '@apollo/client'
import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import CharactersPageComponent from '../components/CharactersPageComponent'
import { Characters, GetCharacters, GET_CHARACTERS } from '../utils/query'
import './CharactersPage.css'

const CharactersPage: React.FC = () => {
  const history = useHistory()
  const { data, loading, error } = useQuery<GetCharacters>(GET_CHARACTERS, {
    variables: {
      page: 1,
    },
  })
  const [characters, setCharacters] = useState<Characters[] | undefined>()
  useEffect(() => {
    setCharacters(data?.characters.results)
  }, [data])
  console.log(characters)

  // if (error) {
  //   return <div>Error</div>
  // }
  const onCharacterClick = (id: number) => {
    history.push(`/home/characters/${id}`)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Characters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {characters ? (
          <IonList>
            {characters.map((character) => (
              <CharactersPageComponent
                key={character.id}
                character={character}
                onCharacterClick={onCharacterClick}
              />
            ))}
          </IonList>
        ) : (
          <div className="spinner">
            <IonSpinner name="circles" />
          </div>
        )}
      </IonContent>
    </IonPage>
  )
}

export default CharactersPage
