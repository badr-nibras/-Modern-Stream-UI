import './Home.scss';
import Layout from '../../Layouts/Layout';
import LiveVideo1 from '../../assets/images/live1.jpg';
import Profil from '../../assets/images/profil.jpg';
import LiveVideo from '../Stream/LiveVideo/LiveVideo';
import Avatar from '../Avatar/Avatar';
import GameCard from '../Games/GameCard/GameCard'
import {
    BsArrowRightShort
} from 'react-icons/bs'
import React from 'react';
import axios from 'axios';

class Home extends React.Component {
    constructor() {
        super();

        this.state = {
            channels: [],
            games: [],
            vods: [],
            streams: [],
            streams1: [],
            streams2: [],
            vods1: [],
            vods2: [],
            liveVideos: [
                { minniature: LiveVideo1, profil: Profil },
                { minniature: LiveVideo1, profil: Profil },
                { minniature: LiveVideo1, profil: Profil },
                { minniature: LiveVideo1, profil: Profil },
                { minniature: LiveVideo1, profil: Profil },
                { minniature: LiveVideo1, profil: Profil },
            ]
        }
    }

    async componentDidMount() {
        await axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/user/users")
            .then(res => {
                this.setState({
                    channels: res.data
                })
            });
        await axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/games/")
            .then(res => {
                this.setState({
                    games: res.data
                })
            })

        await axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/streaming/vod")
            .then(res => {
                this.setState({
                    vods: res.data
                })
            })
        await axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/streaming/streams")
            .then(res => {
                this.setState({
                    streams: res.data
                })
            })
        // recherche
        if (localStorage.getItem("toSearchFor") !== "Search...") {
            var newChannels = this.state.channels.filter(channel => channel.username.toLowerCase().indexOf(localStorage.getItem("toSearchFor") === "Search..." ? "".toLowerCase() : localStorage.getItem("toSearchFor").toLowerCase()) !== -1);
            this.setState({
                channels: newChannels
            })

            var newvods1 = this.state.vods.filter(vod => vod.streamInfo.title.toLowerCase().indexOf(localStorage.getItem("toSearchFor") === "Search..." ? "".toLowerCase() : localStorage.getItem("toSearchFor").toLowerCase()) !== -1);
            await this.setState({
                vods1: newvods1
            })

            var newvods2 = this.state.vods.filter(vod => vod.streamInfo.streamer.toLowerCase().indexOf(localStorage.getItem("toSearchFor") === "Search..." ? "".toLowerCase() : localStorage.getItem("toSearchFor").toLowerCase()) !== -1);
            await this.setState({
                vods2: newvods2
            })
            this.setState({
                vods: this.state.vods1.concat(this.state.vods2)
            })
            var newstreams1 = this.state.streams.filter(stream => stream.title.toLowerCase().indexOf(localStorage.getItem("toSearchFor") === "Search..." ? "".toLowerCase() : localStorage.getItem("toSearchFor").toLowerCase()) !== -1);
            await this.setState({
                streams1: newstreams1
            })
            var newstreams2 = this.state.streams.filter(stream => stream.streamer.toLowerCase().indexOf(localStorage.getItem("toSearchFor") === "Search..." ? "".toLowerCase() : localStorage.getItem("toSearchFor").toLowerCase()) !== -1);
            await this.setState({
                streams2: newstreams2
            })
            this.setState({
                streams: this.state.streams1.concat(this.state.streams2)
            })
            var newgames = this.state.games.filter(game => game.title.toLowerCase().indexOf(localStorage.getItem("toSearchFor") === "Search..." ? "".toLowerCase() : localStorage.getItem("toSearchFor").toLowerCase()) !== -1);
            this.setState({
                games: newgames
            })
        }
    }

    visitProfile = (id) => {
        localStorage.setItem("visitedChannelId", id);
        window.location.href = '/profile';
    }

    render() {
        return (
            <Layout>
                <div className="home grid">
                    <div className="subscribes_section">
                        <div className="section_header">
                            <div>
                                <h2>Subscribed channels</h2>

                                <p>Let's check what you missed.</p>
                            </div>
                            <span>
                                See more
                                <BsArrowRightShort className="icon" />
                            </span>
                        </div>
                        <div className="channels">
                            {this.state.channels.slice(0, 8).map((channel, key) => {
                                return (
                                    <div key={key} className="channel" onClick={() => this.visitProfile(channel._id)} >
                                        <Avatar img={{ src: channel.photoUrl, size: "semi-large", border: true }} />
                                        <p>@{channel.username}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <hr />
                    <div className="lives_section">
                        <div className="section_header">
                            <div>
                                <h2>Popular live channels</h2>
                                <p>Let's see what's trending here.</p>
                            </div>
                            <span onClick={() => window.location.href = '/streams'}>
                                See more
                                <BsArrowRightShort className="icon" />
                            </span>
                        </div>
                        <div className="live_videos">
                            {this.state.streams.slice(0, 6).map((stream, i) => {
                                return (
                                    <LiveVideo
                                        key={i}
                                        liveVideo={{
                                            live: "true",
                                            miniature: stream.miniature,
                                            profil: Profil,
                                            title: stream.title,
                                            streamer: stream.streamer,
                                            streamerId: stream.streamerId,
                                            streamId: stream._id,
                                            streamedWith: stream.streamedWith,
                                            socketId: stream.socketId,
                                            playbackUrl: stream.url
                                        }}
                                    />
                                );
                            })}
                            {this.state.vods.slice(0, 6).map((vod, i) => {
                                return (
                                    <LiveVideo
                                        key={i}
                                        liveVideo={{
                                            live: "false",
                                            miniature: vod.streamInfo.miniature,
                                            profil: Profil,
                                            title: vod.streamInfo.title,
                                            streamId: vod._id,
                                            streamer: vod.streamInfo.streamer,
                                            streamerId: vod.streamInfo.streamerId,
                                            socketId: vod.streamInfo.socketId,
                                            playbackUrl: vod.streamInfo.url
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <hr />
                    <div className="games_section">
                        <div className="section_header">
                            <div>
                                <h2>Popular games</h2>
                                <p>The games trending here.</p>
                            </div>
                            <span onClick={() => window.location.href = '/games'}>
                                See more
                                <BsArrowRightShort className="icon" />
                            </span>
                        </div>
                        <div className="games grid">
                            {this.state.games.slice(0, 10).map((game, index) => {
                                return (
                                    <GameCard key={index} game={game} />
                                );
                            })}
                        </div>
                    </div>
                    <hr />
                </div>
            </Layout>
        );
    }
}

export default Home;