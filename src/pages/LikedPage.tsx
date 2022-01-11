import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'

import './LikedPage.css'

const LikedPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liked</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div>LikedPage</div>
      </IonContent>
    </IonPage>
  )
}

export default LikedPage
