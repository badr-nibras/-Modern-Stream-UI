import './Games.scss';
//images
import game1 from '../../../assets/images/game1.jpg';
import game2 from '../../../assets/images/game2.jpg';
import game3 from '../../../assets/images/game3.jpg';
import game4 from '../../../assets/images/game4.jpg';


const Games = () => {

    const games = [game1,game2,game3, game4];

    return (
        <section className="section" id="games">
            <h2 className="section_title">Games</h2>
            <p className="section_subtitle">Latest games to play !</p>
            <div className="games_container container grid">
                { games.map((game,index) => (
                    <div key={index}>
                        <img src={game} alt="Game"/>
                    </div>
                ))}
            </div>
        </section>
    );
}
 
export default Games;