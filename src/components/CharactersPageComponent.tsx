import { Characters } from '../utils/query'
import '../pages/CharactersPage.css'
const CharactersPageComponent: React.FC<{
  character: Characters
  onCharacterClick: (id: number) => void
}> = ({ character, onCharacterClick }) => {
  return (
    <div
      className="list-item"
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
    </div>
  )
}
export default CharactersPageComponent
