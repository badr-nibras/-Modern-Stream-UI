import './SelectGame.scss';


const SelectGame = (title, gameImg) => {

    return (
        <li >
            <div className="gamediv">
                <ul>
                    <li>
                        <img className="game game-circle" src={gameImg} />
                    </li>
                    <li>
                        <a>{title}</a>
                    </li>
                </ul>
            </div>
        </li>

    );
}
export default SelectGame;
