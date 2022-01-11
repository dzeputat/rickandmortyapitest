import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { heartOutline, home, homeOutline, personOutline } from 'ionicons/icons'
import { Route } from 'react-router'

import CharacterDetailPage from './CharacterDetailPage'
import CharactersPage from './CharactersPage'
import LikedPage from './LikedPage'
import './Home.css'
import UserPage from './UserPage'
import EpisodesPage from './EpisodesPage'

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
        <Route exact path="/home/:tab(liked)" component={LikedPage} />
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
        <IonTabButton tab="liked" href="/home/liked">
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