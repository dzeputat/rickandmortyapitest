import { useQuery } from '@apollo/client'
import {
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { search } from 'ionicons/icons'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import CharactersPageComponent from '../components/CharactersPageComponent'
import {
  AllCharacters,
  Characters,
  GetAllCharacters,
  GetCharacters,
  GET_ALL,
  GET_CHARACTERS,
} from '../utils/query'
import './AllCharacters.css'

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
  const [searchText, setSearchText] = useState('')
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
          setCharacters(characters ? [...characters, ...array] : [...array])
        })

        .catch((err) => {
          console.log(err)
        })
    }
  }, [data])

  console.log(characters?.length)
  const onChangeHandler = (text: any) => {
    let matches: AllCharacters[] = []
    if (!characters) return
    if (text.length > 0) {
      matches = characters.filter((char) => {
        const regex = new RegExp(`${text}`, 'gi')
        return char.name.match(regex)
      })
    }
    console.log(matches)
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
          <IonTitle>Characters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {error && <div className="spinner">{error.message}</div>}
        {characters ? (
          <>
            <IonInput
              className="input-search"
              placeholder="Search"
              value={text}
              onIonChange={(e) => onChangeHandler(e.detail.value!)}
            ></IonInput>
            {suggestion &&
              suggestion.map((character) => (
                <IonItem
                  className="item-search"
                  onClick={onCharacterClick.bind(null, character.id)}
                >
                  <IonLabel key={character.id}>{character.name}</IonLabel>
                </IonItem>
              ))}

            <IonList>
              {text
                ? suggestion.map((character) => (
                    <div
                      onClick={onCharacterClick.bind(null, character.id)}
                      className="list-item__info"
                      key={character.id}
                    >
                      <h2>{character.name}</h2>
                      <h2>{character.status}</h2>
                    </div>
                  ))
                : characters.map((character) => (
                    <div
                      onClick={onCharacterClick.bind(null, character.id)}
                      className="list-item__info"
                      key={character.id}
                    >
                      <h2>{character.name}</h2>
                      <h2>{character.status}</h2>
                    </div>
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
