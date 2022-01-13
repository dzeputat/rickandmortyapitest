import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { heartOutline, homeOutline, personOutline } from 'ionicons/icons'
import { Route } from 'react-router'

import CharacterDetailPage from './CharacterDetailPage'
import CharactersPage from './CharactersPage'

import './Home.css'
import UserPage from './UserPage'
import EpisodesPage from './EpisodesPage'
import FavoriteCharactersPage from './FavoriteCharactersPage'

const Home: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home/:tab(characters)" component={CharactersPage} />
        <Route
          exact
          path="/home/:tab(characters)/:characterId"
          component={CharacterDetailPage}
        />
        <Route
          exact
          path="/home/:tab(favorite)"
          component={FavoriteCharactersPage}
        />
        <Route exact path="/home/:tab(user)" component={UserPage} />
        <Route exact path="/home/:tab(episode)" component={EpisodesPage} />
        <Route
          exact
          path="/home/:tab(episode)/:episodeId"
          component={EpisodesPage}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="characters" href="/home/characters">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="favorite" href="/home/favorite">
          <IonIcon icon={heartOutline} />
          <IonLabel>Liked</IonLabel>
        </IonTabButton>
        <IonTabButton tab="user" href="/home/user">
          <IonIcon icon={personOutline} />
          <IonLabel>User</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Home
