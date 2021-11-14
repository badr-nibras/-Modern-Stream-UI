import Layout from '../../../Layouts/Layout';
import './GameDetails.scss';
import GameCover from '../../../assets/images/gameCover.jpg';
import Avatar from '../../Avatar/Avatar';
import gamePicture1 from '../../../assets/images/card1.jpg';
import { useEffect, useState } from 'react';
import RecordVideo from '../../Profile/RecordVideo/RecordVideo';
import LiveVideo1 from '../../../assets/images/live1.jpg';
import Profil from '../../../assets/images/profil.jpg';
import LiveVideo from '../../Stream/LiveVideo/LiveVideo';

const GameDetails = () => {

    
    const [currentBloc, onTapNavItem] = useState(0);
    const [game, setGame] = useState(null);


    useEffect(() => {
        const gameData = JSON.parse(localStorage.getItem('currentGame'))
        setGame(gameData)
    }, [])

    const blocs = [
        { link: "Lives", component: <Lives /> },
        { link: "Videos", component: <Videos /> },
    ]

    return (
        <Layout>
            <div className="game_details">
                <img src={GameCover} alt="Game cover" />
                <div className="overlay"></div>
                <div className="game_container container">
                    <div className="game_content">
                        <Avatar img={{ src: gamePicture1, size: "xl-large", border: false }} />
                        <div className="game_info">
                            <h2>{ game && game.title }</h2>
                            <p>{ game && game.players } Players</p>
                            <p className="description">
                                { game && game.description }
                            </p>
                        </div>
                    </div>
                </div>
                <ul className="nav nav_list">
                    {
                        blocs.map((bloc, index) => {
                            return (
                                <li
                                    key={index}
                                    className={`nav_item ${index === currentBloc && "active_item"} `}
                                    onClick={() => {
                                        onTapNavItem(index)
                                    }}
                                >
                                    <div className="nav_link">
                                        {bloc.link}
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
                {
                    blocs.map((bloc, index) => {
                        return (
                            <div key={index} style={{ display: currentBloc !== index ? "none" : "" }}>
                                {bloc.component}
                            </div>
                        );
                    })
                }
            </div>
        </Layout>
    );
}

const Videos = () => {
    return (
        <div className="content_section">
            <div className="header_section">
                <h2>Listed streams</h2>
                <p>All streams of PUBG Mobile.</p>
            </div>
            <div className="videos">
                {[1,1,1,1,1,1].map((stream, index) => {
                    return (
                        <RecordVideo
                            key={index}
                            recordVideo={{
                                miniature: LiveVideo1,
                                title: 'Someone"s title playing PUBG Mobile'
                            }}
                        />
                    )
                })}

            </div>
        </div>
    );
}

const Lives = () => {
    return (
        <div className="content_section">
            <div className="header_section">
                <h2>Listed videos</h2>
                <p>All recording videos of PUBG Mobile.</p>
            </div>
            <div className="videos">
                {[1,1,1,1,1,1].map((stream, index) => {
                    return (
                        <LiveVideo 
                            key={index}
                            liveVideo={{
                                miniature: LiveVideo1,
                                profil: Profil
                            }} 
                        />
                    )
                })}

            </div>
        </div>
    );
}

export default GameDetails;