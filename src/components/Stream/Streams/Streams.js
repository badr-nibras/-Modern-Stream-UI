import React from 'react';
import './Streams.scss';
import Layout from '../../../Layouts/Layout';
import LiveVideo from '../../Stream/LiveVideo/LiveVideo'
import Profil from '../../../assets/images/profil.jpg';
import axios from 'axios'


class Stream extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            streams1: [],
            streams2: [],
            streams: [],
            vods: []
        }
    }

    async componentDidMount() {
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
        // Recherche
        if (localStorage.getItem("toSearchFor") !== "Search...") {

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
        }
    }

    render() {
        return (
            <Layout>
                <div className="lives_section padding">
                    <div className="header_section">
                        <h2>Suggested streams for you</h2>
                        <p>What people are watching around the world.</p>
                    </div>
                    <div className="live_videos grid">
                        {this.state.streams.map((stream, i) => {
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
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="header_section">
                        <h2>All Streams</h2>
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
            </Layout>
        );
    }
}

export default Stream;