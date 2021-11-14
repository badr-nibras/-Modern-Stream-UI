import './StreamChat.scss'
import { Component } from 'react'
import ReactPlayer from 'react-player';
import { io } from "socket.io-client";
import axios from "axios";

class StreamChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playbackUrl: props.playbackUrl,
            socketId: localStorage.getItem("videoToWatchWithoutOBS"),
            userId: props.userId,
            id: localStorage.getItem("userId"),
            user: "",
            streamedWith: props.streamedWith,
            streamToWatchId: props.streamId,
            isLive: localStorage.getItem("isLive"),
            socket: io(process.env.REACT_APP_SOCKET),
            peerConnection: null,
            userVideo: null,
            message: '',
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



        if (this.state.streamedWith === 'rtc') {

            this.state.socket.on("offer", (id, description) => {
                this.state.peerConnection = new RTCPeerConnection(this.state.config);
                this.state.peerConnection
                    .setRemoteDescription(description)
                    .then(() => this.state.peerConnection.createAnswer())
                    .then(sdp => this.state.peerConnection.setLocalDescription(sdp))
                    .then(() => {
                        this.state.socket.emit("answer", id, this.state.peerConnection.localDescription);
                    });
                this.state.peerConnection.ontrack = event => {
                    console.log('getting')
                    this.setState({
                        userVideo: event.streams[0]
                    })
                    this.state.socket.emit('joinChat', this.state.socketId);
                };
                this.state.peerConnection.onicecandidate = event => {
                    if (event.candidate) {
                        this.state.socket.emit("candidate", id, event.candidate);
                    }
                };
            });
            this.state.socket.on("candidate", (id, candidate) => {
                this.state.peerConnection
                    .addIceCandidate(new RTCIceCandidate(candidate))
                    .catch(e => console.error(e));
            });

            this.state.socket.on("connect", () => {
                this.state.socket.emit("watcher", this.state.socketId);
            });

            this.state.socket.on("broadcaster", () => {
                this.state.socket.emit("watcher", this.state.socketId);
            });
        }
        else {
            this.state.socket.emit('joinChat', this.state.socketId);
        }
        this.state.socket.on("message", (message, sender) => {

            const string = "<div className='message'><p>@" + sender + ": <span>" + message + "</span></p></div>";
            document.getElementById('messages').innerHTML += string;
        });
        await axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${this.state.id}`)
            .then(res => {
                this.setState({
                    user: res.data[0].username
                })
            })
        if (this.state.isLive === "true")
            await axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/streaming/stream/Chat`, { id: this.state.socketId, isLive: this.state.isLive })
                .then(res => {
                    document.getElementById('messages').innerHTML += res.data;

                })
        else
            await axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/streaming/stream/Chat`, { id: this.state.streamToWatchId, isLive: this.state.isLive })
                .then(res => {
                    document.getElementById('messages').innerHTML += res.data;

                })

        window.onunload = window.onbeforeunload = () => {
            this.state.socket.close();
            this.state.peerConnection.close();
        };
    }

    getmessage = (event) => {
        this.setState({ message: event.target.value })
    }
    sendTheMessage = () => {
        this.state.socket.emit('message', this.state.socketId, this.state.message, this.state.user);
        document.getElementById('message').value = '';
    }


    render() {
        return (
            <div className="playback">
                
                    <div className="chat">
                        <div className="messages" id="messages">
                        </div>

                        <div className="chat_text">
                            <input className="input-dark" type="text" placeholder="Send a message" id='message' onChange={this.getmessage} disabled={this.state.isLive === "false" ? true : false} />
                            <input type="button" className="button button--smaller" value="Send" onClick={this.sendTheMessage} disabled={this.state.isLive === "false" ? true : false} />
                        </div>

                    </div>
                
                <div className="player">
                    <ReactPlayer
                        className="playback_player"
                        width={"100%"}
                        url={this.state.isLive === "true" && this.state.streamedWith === "rtc" ? this.state.userVideo : this.state.playbackUrl}
                        playing
                        controls={true}
                    />
                </div>
                <div className="chat_text">
                    <input className="input-dark" type="text" placeholder="Send a message" onChange={this.getmessage} />
                    <input type="button" className="button button--smaller" value="Send" onClick={this.sendTheMessage} />
                </div>
            </div>
        );
    }

}




export default StreamChat;