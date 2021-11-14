import Layout from '../../../Layouts/Layout';
import StreamChat from '../StreamChat/StreamChat'
import { Component } from 'react'
import LiveVideo from '../LiveVideo/LiveVideo'
import Profil from '../../../assets/images/profil.jpg';
import axios from 'axios'


class StreamDetails extends Component {
    state = {
        playbackUrl: localStorage.getItem("videoToWatch"),
        socketId: localStorage.getItem("videoToWatchWithoutOBS"),
        streamId: localStorage.getItem("streamToWatchId"),
        isLive: localStorage.getItem("isLive"),
        userId: localStorage.getItem("userId"),
        streamedWith: localStorage.getItem("streamedWith"),
        streamInfo: [],
        vods: []
    }

    async componentDidMount() {
        if (this.state.isLive === "false") {
            await axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/streaming/videoById/${this.state.streamId}`)
                .then(res => {
                    this.setState({
                        streamInfo: res.data[0].streamInfo
                    })
                })
        } else {
            await axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/streaming/streamById/${this.state.streamId}`)
                .then(res => {
                    this.setState({
                        streamInfo: res.data[0]
                    })
                })
        }

        axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/streaming/vod")
            .then(res => {
                this.setState({
                    vods: res.data
                })
            })
        //Recherche
        var newvods = this.state.vods.filter(vod => vod.streamInfo.title.toLowerCase().indexOf(localStorage.getItem("toSearchFor") === "Search..." ? "".toLowerCase() : localStorage.getItem("toSearchFor").toLowerCase()) !== -1);
        this.setState({
            vods: newvods
        })
    }

    render() {
        return (
            <Layout>
                <div className="stream grid">
                    <div className="playback_section">
                        <div className="header_section">
                            <h2>{this.state.streamInfo.title}</h2>
                            <p>{this.state.streamInfo.streamer} </p>
                        </div>
                        <StreamChat
                            playbackUrl={this.state.playbackUrl} userId={this.state.userId} socketId={this.state.socketId} isLive={this.state.isLive} streamId={this.state.streamId} streamedWith={this.state.streamedWith}
                        />
                    </div>
                    <div className="lives_section">
                        <div className="header_section">
                            <h2>Suggested streams for you</h2>
                            <p>What people are watching around the world.</p>
                        </div>
                        <div className="live_videos grid">
                            {this.state.vods.map((vod, i) => {
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
                </div>
            </Layout>
        );
    }
}

export default StreamDetails;