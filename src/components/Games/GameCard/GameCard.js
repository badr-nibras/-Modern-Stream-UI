import './GameCard.scss';
import gamePicture1 from '../../../assets/images/card1.jpg';

const GameCard = ({game}) => {
    return (
        <div className="game_card" onClick={() => {
            localStorage.setItem("currentGame", JSON.stringify(game));
            window.location.href = "/games/details"
        }}>
            <img src={game.image ?? gamePicture1} alt={game.title}/>
            <h5 className="live_title">{game.title}</h5>
            {/* <p className="details">{game.players} players</p> */}
        </div>
    );
}
 
export default GameCard;