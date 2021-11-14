import Layout from "../../Layouts/Layout";
import Avatar from '../Avatar/Avatar';
import LiveVideo from '../Stream/LiveVideo/LiveVideo';
import LiveVideo1 from '../../assets/images/live1.jpg';
import Profil from '../../assets/images/profil.jpg';
import gamePicture1 from '../../assets/images/card1.jpg';
import GameCard from '../Games/GameCard/GameCard'
import {
    BsArrowRightShort
} from 'react-icons/bs'

const Search = () => {

    return (
        <Layout>
            <div className="search_container padding">
                <div className="header_section">
                    <h2>Channels</h2>
                    <p>Some streamers channels.</p>
                </div>
                <div className="channels">
                    {[1,2,].map(() => {
                        return (
                            <>
                                <div className="channel">
                                    <Avatar img={{ src: Profil, size: "semi-large", border: true }} />
                                    <p>@Gamer_X</p>
                                </div>
                            </>
                        );
                    })}
                </div>
                <br/>
                <hr/>
                <br/>
                <div className="section_header">
                    <div>
                        <h2>Streams</h2>
                        <p>Some streaming video.</p>
                    </div>
                    <span onClick={() => window.location.href = '/streams'}>
                        See more
                        <BsArrowRightShort className="icon" />
                    </span>
                </div>
                <div className="live_videos">
                    {[1,2,3,].map((liveVideo) => {
                        return (
                            <LiveVideo 
                                liveVideo={{
                                    miniature: LiveVideo1,
                                    profil: Profil
                                }} 
                            />
                        );
                    })}
                </div>
                <br/>
                <hr/>
                <br/>
                
                <div className="section_header">
                    <div>
                        <h2>Games</h2>
                        <p>Games matched your search.</p>
                    </div>
                    <span onClick={() => window.location.href = '/games'}>
                        See more
                        <BsArrowRightShort className="icon" />
                    </span>
                </div>
                <div className="games grid">
                    {[1,1,1,1,1].map(() => {
                        return (
                            <GameCard game={{
                                image: gamePicture1,
                                title: 'PUBG Mobile',
                                players: '1.2k'
                            }}/>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
 
export default Search;