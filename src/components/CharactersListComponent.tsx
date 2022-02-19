import { IonItem, IonLabel, IonText } from '@ionic/react'
import { AllCharacters } from '../utils/query'

const CharactersListComponent: React.FC<{
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
export default CharactersListComponent
