import { useQuery } from '@apollo/client'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  useIonViewWillEnter,
} from '@ionic/react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import CharactersPageComponent from '../components/CharactersPageComponent'
import { Characters, GetCharacters, GET_CHARACTERS } from '../utils/query'
import './CharactersPage.css'

const CharactersPage: React.FC = () => {
  const history = useHistory()
  const [disableInfiniteScroll, setDisableInfiniteScroll] =
    useState<boolean>(false)
  const [page, setPage] = useState<number | undefined>()
  const { data, error, fetchMore } = useQuery<GetCharacters>(GET_CHARACTERS, {
    variables: {
      page: 1,
    },
  })
  const [characters, setCharacters] = useState<Characters[] | undefined>()
  useEffect(() => {
    setCharacters(data?.characters.results)
    setPage(data?.characters.info.next)
  }, [data])
  const onCharacterClick = (id: number) => {
    history.push(`/home/characters/${id}`)
  }
  const onFetchMore = () => {
    if (page === data?.characters.info.pages || !page) {
      return
    }

    fetchMore({
      variables: {
        page: page,
      },
    })
      .then(({ data }) => {
        if (!characters) {
          setDisableInfiniteScroll(true)
          return
        }
        setCharacters([...characters, ...data.characters.results])
        setPage(page + 1)
        setDisableInfiniteScroll(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useIonViewWillEnter(() => {
    onFetchMore()
  })

  const searchNext = (event: any) => {
    onFetchMore()
    event.target.complete()
  }
  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    fetchMore({
      variables: {
        page: 1,
      },
    })
      .then(({ data }) => {
        setCharacters(data.characters.results)
        setPage(data.characters.info.next)
        event.detail.complete()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Characters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher
          slot="fixed"
          onIonRefresh={doRefresh}
          pullFactor={0.5}
          pullMin={100}
          pullMax={200}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {error && <div className="spinner">{error.message}</div>}
        {characters && !error ? (
          <>
            <IonList>
              {characters.map((character) => (
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
        <IonInfiniteScroll
          threshold="100px"
          disabled={disableInfiniteScroll}
          onIonInfinite={(e: any) => searchNext(e)}
        >
          <IonInfiniteScrollContent loading-spinner="bubbles"></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  )
}

export default CharactersPage
