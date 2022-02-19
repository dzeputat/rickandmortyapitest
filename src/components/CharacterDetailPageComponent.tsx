import { IonButton, IonCard, IonIcon } from '@ionic/react'
import { thumbsDownOutline, thumbsUpOutline } from 'ionicons/icons'
import moment from 'moment'
import { Character } from '../utils/query'
import './CharacterDetailPageComponent.css'
const CharacterDetailPageComponent: React.FC<{
  character: Character
  onEpisodeClick: (id: number) => void
  onLikeOrDislikeBtnClick: (character: Character, like: boolean) => void
  like: boolean | null
  dislike: boolean | null
}> = ({
  character,
  onEpisodeClick,
  onLikeOrDislikeBtnClick,
  like,
  dislike,
}) => {
  return (
    <div className="character">
      <div className="character__img">
        <img src={character.image} alt={character.name} />
      </div>
      <div className="character__btns">
        <IonButton
          fill="clear"
          className="character__btns-favorite"
          onClick={onLikeOrDislikeBtnClick.bind(null, character, true)}
        >
          <IonIcon
            icon={thumbsUpOutline}
            slot="icon-only"
            style={{ color: like === true && 'red' }}
          ></IonIcon>
        </IonButton>
        <IonButton
          fill="clear"
          onClick={onLikeOrDislikeBtnClick.bind(null, character, false)}
        >
          <IonIcon
            icon={thumbsDownOutline}
            slot="icon-only"
            style={{ color: dislike === true && 'red' }}
          ></IonIcon>
        </IonButton>
      </div>
      <div className="character__content">
        <div className="character__content-text">
          Name: <h3>{character.name}</h3>
        </div>
        <div className="character__content-text">
          Gender:
          <h3>{character.gender}</h3>
        </div>
        <div className="character__content-text">
          Species:
          <h3>{character.species}</h3>
        </div>
        <div className="character__content-text">
          Status:
          <h3>{character.status}</h3>
        </div>
        <div className="character__content-text">
          Location:
          <h3> {character.location.name}</h3>
        </div>
        <div className="character__content-text">
          Created:
          <h3> {moment(character.created).format('DD.MM.YY')}</h3>
        </div>
      </div>
      <div className="character__episode">
        {character.episode.map((i) => (
          <IonCard
            key={i.id}
            className="character__episode-item"
            onClick={onEpisodeClick.bind(null, i.id)}
          >
            <h3>{i.episode}</h3>
            <h3>{i.name}</h3>
          </IonCard>
        ))}
      </div>
    </div>
  )
}
export default CharacterDetailPageComponent
