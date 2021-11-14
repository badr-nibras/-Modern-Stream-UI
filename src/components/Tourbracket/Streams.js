import { Component } from "react"
import Layout from "../../Layouts/Layout"
import ReactPlayer from 'react-player'
import './Stream.scss'
import {
    RiPushpin2Fill
} from 'react-icons/ri'
// import axios from 'axios'
import { io } from "socket.io-client";

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// };

// var round1 = [
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" }
// ];
// var round2 = [
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" }
// ];
// var round3 = [
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" }
// ];
// var round4 = [
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" }
// ];
// var round5 = [
//     { team: "", player: "", playerId: "" },
//     { team: "", player: "", playerId: "" }
// ];


class Streams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tourId: localStorage.getItem("tourId"),
            id: localStorage.getItem("userId"),
            streams: props.streams,
            sockets: [],
            userVideos: [],
            started: false,
            config: {
                iceServers: [
                    {
                        urls: ["stun:stun.l.google.com:19302"]
                    }
                ]
            }
        }
    }

    async componentDidMount() {

        this.setState({
            loading: true
        })
        // await axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${this.state.id}`)
        //     .then(res => {
        //         this.setState({
        //             user: res.data[0].username
        //         })
        //     })
        // await axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/tournement/${this.state.tourId}`)
        //     .then(res => {
        //         this.setState({
        //             creator: res.data.creator,
        //             rounds: res.data.rounds,
        //             winner: res.data.winner,
        //             r1: res.data.round1Participents,
        //             r2: res.data.round2Participents,
        //             r3: res.data.round3Participents,
        //             r4: res.data.round4Participents,
        //             r5: res.data.round5Participents
        //         })

        //         for (var i = 0; i < this.state.r1.length; i++) {
        //             round1[i] = this.state.r1[i]
        //         }
        //         for (var j = 0; j < this.state.r2.length; j++) {
        //             round2[j] = this.state.r2[j]
        //         }
        //         for (var k = 0; k < this.state.r3.length; k++) {
        //             round3[k] = this.state.r3[k]
        //         }
        //         for (var l = 0; l < this.state.r4.length; l++) {
        //             round4[l] = this.state.r4[l]
        //         }
        //         for (var n = 0; n < this.state.r5.length; n++) {
        //             round5[n] = this.state.r5[n]
        //         }
        //         this.setState({
        //             loading: false
        //         })
        //     })
        // for (var a = 0; a < round1.length; a++) {
        //     if (round1[a].playerId !== "") {
        //         axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/streaming/streamByUser/${round1[a].playerId}`)
        //             .then(res => {
        //                 this.setState({
        //                     streams: this.state.streams.concat(res.data)
        //                 })
        //             })
        //     }
        // }
        /*for (var b = 0; b < round2.length; b++) {
            if (round2[b].playerId !== "") {
                axios.get(`/api/streaming/streamByUser/${round2[b].playerId}`)
                    .then(res => {
                        this.setState({
                            streams: this.state.streams.concat(res.data)
                        })
                    })
            }
        }
        for (var c = 0; c < round3.length; c++) {
            if (round3[c].playerId !== "") {
                axios.get(`/api/streaming/streamByUser/${round3[c].playerId}`)
                    .then(res => {
                        this.setState({
                            streams: this.state.streams.concat(res.data)
                        })
                    })
            }
        }
        for (var d = 0; d < round4.length; d++) {
            if (round4[d].playerId !== "") {
                axios.get(`/api/streaming/streamByUser/${round4[d].playerId}`)
                    .then(res => {
                        this.setState({
                            streams: this.state.streams.concat(res.data)
                        })
                    })
            }
        }
        for (var e = 0; e < round5.length; e++) {
            if (round5[e].playerId !== "") {
                axios.get(`/api/streaming/streamByUser/${round5[e].playerId}`)
                    .then(res => {
                        this.setState({
                            streams: this.state.streams.concat(res.data)
                        })
                    })
            }
        }*/

        console.log(this.state.streams)
        if (this.state.started === false) {

            for (let i = 0; i < this.state.streams.length-1; i++) {
                if (this.state.streams[i].streamedWith === "rtc") {
                    this.state.sockets[i] = io(process.env.REACT_APP_SOCKET);
                    console.log(i + "hello from :" + this.state.sockets[i])
                    console.log("to watch :" + this.state.streams[i].socketId)

                    this.state.sockets[i].on("me", (id) => {
                        console.log("socket " + id)

                    })
                    this.state.sockets[i].on("offer", (id, description) => {
                        this.state.peerConnection = new RTCPeerConnection(this.state.config);
                        this.state.peerConnection
                            .setRemoteDescription(description)
                            .then(() => this.state.peerConnection.createAnswer())
                            .then(sdp => this.state.peerConnection.setLocalDescription(sdp))
                            .then(() => {
                                this.state.sockets[i].emit("answer", id, this.state.peerConnection.localDescription);
                            });
                        this.state.peerConnection.ontrack = event => {
                            console.log("we get :" + event.streams[0])
                            let videoArray = this.state.userVideos.concat(event.streams[0])
                            this.setState({
                                userVideos: videoArray
                            })
                        };
                        this.state.peerConnection.onicecandidate = event => {
                            if (event.candidate) {
                                this.state.sockets[i].emit("candidate", id, event.candidate);
                            }
                        };
                    });
                    this.state.sockets[i].on("candidate", (id, candidate) => {
                        this.state.peerConnection
                            .addIceCandidate(new RTCIceCandidate(candidate))
                            .catch(e => console.error(e));
                    });

                    this.state.sockets[i].on("connect", () => {
                        this.state.sockets[i].emit("watcher", this.state.streams[i].socketId);
                    });

                    this.state.sockets[i].on("broadcaster", () => {
                        this.state.sockets[i].emit("watcher", this.state.streams[i].socketId);
                    });

                }
                else {

                    this.setState({
                        userVideos: this.state.userVideos.concat(this.state.streams[i].url)

                    })
                }
            }
        }
    }

    onSwitch = (index) => {
        var streams = document.getElementById("streams").children;
        for (let index = 0; index < streams.length; index++) {
            var stream = streams[index];
            stream.classList.remove('plein');
        }
        streams[index].classList.add("plein");
    }


    render() {
        return (
            <Layout>
                <div className="padding">
                    <div className="header_section">
                        <h2>Tournement streams</h2>
                        <p>Watch all the streams in the tournement.</p>
                    </div>
                    <div id="streams" className="tourbracket_streams grid">

                        {this.state.userVideos.forEach((videoSrc,index) => {
                            console.log(index+" stream");
                            <div className={`player_wrapper ${index === 0 && "plein"}`}>
                                <div className="switch_icon" onClick={(e) => this.onSwitch(index)}>
                                    <RiPushpin2Fill />
                                </div>
                                <ReactPlayer
                                    key={index}
                                    className="stream_player"
                                    url={videoSrc}
                                    playing
                                    controls={false}
                                />
                            </div>
                        }
                        )
                        }

                    </div>
                </div>
            </Layout>
        );
    }
}

export default Streams;