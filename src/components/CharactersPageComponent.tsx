import { Characters } from '../utils/query'
import './CharactersPageComponent.css'
import { IonButton, IonIcon } from '@ionic/react'
import { thumbsDownOutline } from 'ionicons/icons'

const CharactersPageComponent: React.FC<{
  character: Characters
  onCharacterClick: (id: number) => void
  onDislikeClick?: (e: any, item: Characters) => void
}> = ({ character, onCharacterClick, onDislikeClick }) => {
  return (
    <div
      className={`list-item ${onDislikeClick && 'dislike'}`}
      onClick={onCharacterClick.bind(null, character.id)}
    >
      <div className="list-item__avatar">
        <img src={character.image} />
      </div>
      <div className="list-item__info">
        <h2>{character.name}</h2>
        <h3>{character.status}</h3>
        <p>{character.species}</p>
      </div>
      {onDislikeClick && (
        <div className="list-item__dislike">
          <IonButton fill="clear" onClick={(e) => onDislikeClick(e, character)}>
            <IonIcon icon={thumbsDownOutline} slot="icon-only"></IonIcon>
          </IonButton>
        </div>
      )}
    </div>
  )
}
export default CharactersPageComponent
