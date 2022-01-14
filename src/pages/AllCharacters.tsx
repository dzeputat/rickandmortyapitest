import { useQuery } from '@apollo/client'
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import { AllCharacters, GetAllCharacters, GET_ALL } from '../utils/query'
import './AllCharacters.css'
const AllCharactersComponent: React.FC<{
  character: AllCharacters
  onCharacterClick: (id: number) => void
}> = ({ character, onCharacterClick }) => {
  return (
    <IonItem>
      <IonLabel onClick={onCharacterClick.bind(null, character.id)}>
        <IonText color="primary">
          <h3>{character.name}</h3>
        </IonText>

        <IonText color="secondary">
          <p>{character.status}</p>
        </IonText>
      </IonLabel>
    </IonItem>
  )
}
const AllCharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<AllCharacters[]>()
  const [suggestion, setSuggestion] = useState<AllCharacters[]>([])
  const [text, setText] = useState('')

  const history = useHistory()
  const { data, error, fetchMore } = useQuery<GetAllCharacters>(GET_ALL, {
    variables: {
      page: 1,
    },
  })

  useEffect(() => {
    const length = data?.characters.info.pages
    if (!length) {
      return
    }
    const array: AllCharacters[] = []
    for (let i = 1; i <= length; i++) {
      fetchMore({
        variables: {
          page: i,
        },
      })
        .then(({ data }) => {
          array.push(...data.characters.results)
        })
        .then(() => {
          if (characters?.length === 826) return
          setCharacters(characters ? [...characters, ...array] : [...array])
        })

        .catch((err) => {
          console.log(err)
        })
    }
  }, [data])

  const onChangeHandler = (text: any) => {
    let matches: AllCharacters[] = []
    if (!characters) return
    if (text.length > 0) {
      matches = characters.filter((char) => {
        const regex = new RegExp(`${text}`, 'gi')
        return char.name.match(regex)
      })
    }

    setSuggestion(matches)
    setText(text)
  }
  const onCharacterClick = (id: number) => {
    history.push(`/home/characters/${id}`)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {error && <div className="spinner">{error.message}</div>}
        {characters ? (
          <>
            <IonItem lines="none">
              <IonInput
                className="input-search"
                placeholder="Search"
                value={text}
                onIonChange={(e) => onChangeHandler(e.detail.value!)}
              ></IonInput>
            </IonItem>
            {suggestion &&
              suggestion.map((character) => (
                <IonItem
                  className="item-search"
                  key={character.id}
                  onClick={onCharacterClick.bind(null, character.id)}
                >
                  <IonLabel>{character.name}</IonLabel>
                </IonItem>
              ))}

            <IonList>
              {text.length > 0
                ? suggestion.map((character) => (
                    <AllCharactersComponent
                      key={character.id}
                      character={character}
                      onCharacterClick={onCharacterClick}
                    />
                  ))
                : characters.map((character) => (
                    <AllCharactersComponent
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

export default AllCharactersPage
