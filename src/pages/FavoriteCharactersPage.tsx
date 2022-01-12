import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import CharactersPageComponent from '../components/CharactersPageComponent'
import { addToFavorite, selectFavoriteItems } from '../store/favorite'
import { Characters } from '../utils/query'

import './FavoriteCharactersPage.css'

const FavoriteCharactersPage: React.FC = () => {
  const favoriteStore = useSelector(selectFavoriteItems)
  const dispatch = useDispatch()
  const history = useHistory()
  const [favoriteList, setFavoriteList] = useState<Characters[] | undefined>()
  useEffect(() => {
    const favorites = favoriteStore
      .filter((i) => i.like === true)
      .map((i) => i.character)
    if (!favorites) {
      return
    }
    setFavoriteList(favorites)
  }, [favoriteStore])
  console.log(favoriteList)
  const onDislikeClick = (e: any, item: Characters) => {
    e.stopPropagation()
    dispatch(addToFavorite({ item: item, favorite: false }))
  }
  const onCharacterClick = (id: number) => {
    history.push(`/home/characters/${id}`)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favorite Characters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {favoriteList && favoriteList.length > 0 ? (
          <IonList>
            {favoriteList.map((character) => (
              <CharactersPageComponent
                key={character.id}
                character={character}
                onCharacterClick={onCharacterClick}
                onDislikeClick={onDislikeClick}
              />
            ))}
          </IonList>
        ) : (
          <div className="empty-title">List Is Empty</div>
        )}
      </IonContent>
    </IonPage>
  )
}

export default FavoriteCharactersPage
