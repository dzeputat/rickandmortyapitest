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
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import CharactersListComponent from '../components/CharactersListComponent'

import { AllCharacters, GetAllCharacters, GET_ALL } from '../utils/query'
import './CharactersListPage.css'

const CharactersListPage: React.FC = () => {
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
    const updateCharacters: AllCharacters[] = []
    for (let i = 1; i <= length; i++) {
      fetchMore({
        variables: {
          page: i,
        },
      })
        .then(({ data }) => {
          updateCharacters.push(...data.characters.results)
        })
        .then(() => {
          if (characters?.length === 826) return
          setCharacters(
            characters
              ? [...characters, ...updateCharacters]
              : [...updateCharacters]
          )
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
        {characters && characters.length >= 800 ? (
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
                    <CharactersListComponent
                      key={character.id}
                      character={character}
                      onCharacterClick={onCharacterClick}
                    />
                  ))
                : characters.map((character) => (
                    <CharactersListComponent
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

export default CharactersListPage
