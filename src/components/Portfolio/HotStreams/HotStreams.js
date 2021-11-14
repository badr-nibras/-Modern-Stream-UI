import './HotStreams.scss';
import { RiLiveLine } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import card1 from '../../../assets/images/card1.jpg';
import card2 from '../../../assets/images/card2.jpg';
import card3 from '../../../assets/images/card3.jpg';
import card4 from '../../../assets/images/card4.jpeg';


const HotStreams = () => {

    const hotStreams = [
        {image: card1, game: "PUBG Mobile", rate: 8.2, watchers: 1.259},
        {image: card2, game: "AMONG US", rate: 9.1, watchers: 15.001},
        {image: card3, game: "FORTNITE", rate: 6.9, watchers: 1.846},
        {image: card4, game: "PES", rate: 8.7, watchers: 4.859},
    ]

    return (
        <section className="hotstreams section" id="hotStreams">
            <h2 className="section_title">Hot Streams</h2>
            <p className="section_subtitle">What's the trend right now</p>
            <div className="hotstreams_container container grid">
                { hotStreams.map((hotstream, index) => (
                    <div className="hotstreams_content" key={ index } onClick={() => {
                        window.location.href = '/stream';
                    }}>
                        <div className="overlay"></div>
                        <div className="overlay overlay-hover">
                            <FaEye className="button_icon" />
                            Watch
                        </div>
                        <img src={ hotstream.image } alt="Stream card"/>
                        <div className="hotstreams_body">
                            <div className="game">
                                <h3>{ hotstream.game }</h3>
                                <p>{ hotstream.rate }</p>
                            </div>
                            <div className="live">
                                <p>{ hotstream.watchers } watchers</p>
                                <span>Live <RiLiveLine className="live_icon" /></span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
 
export default HotStreams;