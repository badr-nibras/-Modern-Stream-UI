import React from 'react';
import axios from "axios";
import './Stream.scss';
import './StreamChat.scss'
import Layout from '../../../Layouts/Layout';
import Miniature from '../../../assets/images/live1.jpg'
// import StreamChat from '../StreamChat/StreamChat'
import Swal from 'sweetalert2'
import Hammer from 'react-hammerjs'
import Spinner from '../../Utils/Spinner/Spinner'
import { io } from "socket.io-client";
import { VideoStreamMerger } from 'video-stream-merger';
import ReactPlayer from 'react-player';
import { upload } from '../../../uploadVideo';
import {
    FiVideo,
    FiVideoOff,
    FiMicOff,
    FiMic
} from 'react-icons/fi'
import {
    MdScreenShare,
    MdStopScreenShare
} from 'react-icons/md'
import { connect } from 'react-redux';
import { setStream, setTitle, setDescription, setMiniature, setStart, setEnd, setMessages } from "../../../actions/StreamActions"
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// };

class Stream extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: localStorage.getItem("userId"),
            user: "",
            userId: localStorage.getItem("userId"),
            playbackUrl: localStorage.getItem("playbackUrl"),
            streamKey: "",
            rtmps: "rtmps://6596e7f54a27.global-contribute.live-video.net:443/app/",
            arn: localStorage.getItem("arn"),
            title: this.props.title,
            description: this.props.description,
            msg: "",
            image: { preview: this.props.miniature, raw: null },
            sounD: true,
            screeN: true,
            videO: false,
            videoStream: null,
            loading: false,
            published: this.props.published,
            streamedWith: 'ivs',
            socketId: "",
            video: this.props.video,
            videoUrl: null,
            message: '',
            merger: new VideoStreamMerger({
                width: 1280,
                height: 720
            }),
            socket: io(process.env.REACT_APP_SOCKET),
            startStream: this.props.startStream,
            endStream: this.props.endStream,
            peerConnections: {},
            config: {
                iceServers: [
                    {
                        urls: ["stun:stun.l.google.com:19302"]
                    }
                ]
            },
            isChatShowing: true
        }
    }


    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    changeDesc = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    handleChange = (e) => {
        if (e.target.files.length) {
            this.setState({
                image: {
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                }
            });
        }
    };

    onUpload = (e) => {
        e.preventDefault();
        window.document.getElementById('input-upload').click();
    }


    async componentDidMount() {

        console.log(this.state.title + "  :: " + this.state.description);

        this.state.socket.on('me', (id) => {
            this.setState({
                socketId: id
            })
        });

        await axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${this.state.id}`)
            .then(res => {
                this.setState({
                    user: res.data[0].username,
                    streamKey: res.data[0].streamKey
                })
            })

        this.state.socket.on('me', (id) => {
            this.setState({
                socketId: id
            })

        });

        this.state.socket.on("watcher", id => {
            const peerConnection = new RTCPeerConnection(this.state.config);
            this.state.peerConnections[id] = peerConnection;

            let stream = this.state.video;
            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

            peerConnection.onicecandidate = event => {
                if (event.candidate) {
                    this.state.socket.emit("candidate", id, event.candidate);
                }
            };

            peerConnection
                .createOffer()
                .then(sdp => peerConnection.setLocalDescription(sdp))
                .then(() => {

                    this.state.socket.emit("offer", id, peerConnection.localDescription);
                });
        });

        this.state.socket.on("answer", (id, description) => {
            this.state.peerConnections[id].setRemoteDescription(description);
        });

        this.state.socket.on("candidate", (id, candidate) => {
            this.state.peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
        });
        this.state.socket.on("disconnectPeer", id => {
            this.state.peerConnections[id].close();
            delete this.state.peerConnections[id];
        });

        this.state.socket.on("message", (message, sender) => {
            const string = "<div className='message'><p>@" + sender + ": <span>" + message + "</span></p></div>";
            document.getElementById('messages').innerHTML += string;
        });




    }


    createChannel = async () => {
        const arn = {
            arn: this.state.arn
        }
        await axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/streaming/channel/delete", arn)


        const stream = {
            authorized: false,
            latencyMode: "LOW",
            name: "userChannel",
            recordingConfigurationArn: "arn:aws:ivs:eu-west-1:284218009595:recording-configuration/b0UJWXpXmNdo",
            type: "STANDARD",

        }
        await axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/streaming/channel/create", stream)
            .then(res => {
                this.setState({
                    playbackUrl: res.data.channel.playbackUrl,
                    streamKey: res.data.streamKey.value,
                    arn: res.data.channel.arn
                })
            })
        const streamkeyschema = {
            id: this.state.id,
            streamKey: this.state.streamKey
        }
        await axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/user/streamkey", streamkeyschema)
        localStorage.setItem("playbackUrl", this.state.playbackUrl);
        //localStorage.setItem("streamkey", this.state.streamKey);
        localStorage.setItem("arn", this.state.arn);
    }

    publishStream = () => {

        this.state.socket.emit("broadcaster");
        this.setState({
            loading: true,
            published: true
        })
        this.props.setTitle(this.state.title);
        this.props.setDescription(this.state.description);
        this.props.setStart(this.state.startStream);
        this.props.setEnd(this.state.endStream);
        this.props.setMiniature(this.state.image.preview);
        var newStream = new FormData()
        newStream.append('files', this.state.image.raw)
        newStream.append('title', this.state.title)
        newStream.append('description', this.state.description)
        newStream.append('playbackUrl', this.state.streamedWith === "rtc" ? `https://rtcbucketunauth.s3.eu-west-1.amazonaws.com/video-${this.state.socketId}.webm` : this.state.playbackUrl)
        newStream.append('streamer', this.state.user)
        newStream.append('channelArn', this.state.arn)
        newStream.append('streamerId', this.state.id)
        newStream.append('socketId', this.state.socketId)
        newStream.append('streamedWith', this.state.streamedWith)
        axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/streaming/stream/publish", newStream)
            .then(res => {
                this.setState({
                    loading: false
                })
                if (res.data.message) {
                    Swal.fire({
                        title: 'Error !',
                        text: res.data.message,
                        icon: 'error',
                    });
                } else {
                    Swal.fire({
                        title: 'Success !',
                        text: res.data,
                        icon: 'success',
                    });
                }
            })
        const channel = {
            channelArn: this.state.arn
        }
        if (this.state.video === null) {
            axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/user/addchannel/${this.state.id}`, channel)
        }

    }

    copyToClipBoard = (text) => {
        navigator.clipboard.writeText(text);
        Swal.fire({
            title: 'Success !',
            text: 'Copied to clipboard !',
            icon: 'success',
        });
    }

    startStreaming = async () => {
        let recorder = null;
        let chunks = [];
        let icons = document.querySelectorAll('#ICON');
        let mediaConstraints = {
            video: {
                width: 1280,
                height: 720
            }
        }
        await this.setState({
            startStream: true
        })
        if (this.state.startStream && this.state.endStream) {
            this.setState({
                endStream: false,
                streamedWith: 'rtc'
            })


            navigator.mediaDevices
                .getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                })
                .then((audioStream) => {
                    navigator.mediaDevices.getDisplayMedia({
                        video: {
                            cursor: 'always',
                            resizeMode: 'crop-and-scale'
                        }
                    })
                        .then((screenStream) => {
                            screenStream = new MediaStream([...screenStream.getTracks(), ...audioStream.getTracks()])


                            this.state.merger.addStream(screenStream, {
                                x: 0, // position of the topleft corner
                                y: 0,
                                width: this.state.merger.width,
                                height: this.state.merger.height,
                                mute: this.state.sounD
                            });

                            icons[0].addEventListener('click', () => {
                                this.setState({
                                    sounD: !this.state.sounD
                                })


                                if (this.state.screeN && !this.state.videO) {
                                    this.state.merger.removeStream(screenStream);
                                    this.state.merger.addStream(screenStream, {
                                        x: 0, // position of the topleft corner
                                        y: 0,
                                        width: this.state.merger.width,
                                        height: this.state.merger.height,
                                        mute: this.state.sounD
                                    });
                                }
                                if ((this.state.videO && !this.state.screeN) || (this.state.videO && this.state.screeN)) {
                                    this.state.merger.removeStream(this.state.videoStream);
                                    this.state.merger.addStream(this.state.videoStream, {
                                        x: 0,
                                        y: this.state.merger.height - 100,
                                        width: 150,
                                        height: 100,
                                        mute: this.state.sounD
                                    });
                                }


                            })

                            icons[1].addEventListener('click', () => {
                                this.setState({
                                    videO: !this.state.videO
                                })
                                if (!this.state.videO) {
                                    this.state.merger.removeStream(this.state.videoStream);
                                    this.state.videoStream.getTracks().forEach(function (track) {
                                        track.stop();
                                    });
                                }
                                else {
                                    navigator.mediaDevices
                                        .getUserMedia(mediaConstraints)
                                        .then((videoStream) => {
                                            this.state.videoStream = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()])
                                        }).catch(error => console.error(error));
                                    if (this.state.screeN)
                                        this.state.merger.addStream(this.state.videoStream, {
                                            x: 0,
                                            y: this.state.merger.height - 100,
                                            width: 150,
                                            height: 100,
                                            mute: true
                                        });
                                    else this.state.merger.addStream(this.state.videoStream, {
                                        x: 0, // position of the topleft corner
                                        y: 0,
                                        width: this.state.merger.width,
                                        height: this.state.merger.height,
                                        mute: this.state.sounD
                                    });
                                }
                            })
                            icons[2].addEventListener('click', () => {
                                this.setState({
                                    screeN: !this.state.screeN
                                })
                                if (!this.state.screeN && this.state.videO) {
                                    this.state.merger.removeStream(screenStream);
                                    this.state.merger.removeStream(this.state.videoStream);
                                    this.state.merger.addStream(this.state.videoStream, {
                                        x: 0, // position of the topleft corner
                                        y: 0,
                                        width: this.state.merger.width,
                                        height: this.state.merger.height,
                                        mute: this.state.sounD
                                    });
                                }
                                if (this.state.screeN && this.state.videO) {
                                    this.state.merger.removeStream(this.state.videoStream);
                                    this.state.merger.addStream(screenStream, {
                                        x: 0, // position of the topleft corner
                                        y: 0,
                                        width: this.state.merger.width,
                                        height: this.state.merger.height,
                                        mute: this.state.sounD
                                    });
                                    this.state.merger.addStream(this.state.videoStream, {
                                        x: 0,
                                        y: this.state.merger.height - 100,
                                        width: 150,
                                        height: 100,
                                        mute: true
                                    });
                                }
                                if (this.state.screeN && !this.state.videO) {
                                    this.state.merger.addStream(screenStream, {
                                        x: 0, // position of the topleft corner
                                        y: 0,
                                        width: this.state.merger.width,
                                        height: this.state.merger.height,
                                        mute: this.state.sounD
                                    });

                                }
                                if (!this.state.screeN && !this.state.videO) {
                                    this.state.merger.removeStream(screenStream);
                                }

                            })
                            window.onbeforeunload = function () {
                                return "leaving will cuz stream ending";
                            }

                            this.state.merger.start()
                            this.setState({
                                video: this.state.merger.result
                            })
                            this.props.setStream(this.state.video);
                            recorder = new MediaRecorder(this.state.video);
                            recorder.ondataavailable = event => {
                                if (event.data.size > 0) {
                                    chunks.push(event.data)
                                }
                            }
                            recorder.onstop = async () => {
                                const blob = new Blob(chunks, {
                                    type: 'video/webm;codecs=vp9'
                                })
                                chunks = []
                                const blobUrl = URL.createObjectURL(blob)
                                this.setState({
                                    video: blobUrl,
                                })

                                if (this.state.published) {
                                    this.setState({
                                        loading: true
                                    })
                                    upload(blob, this.state.socketId);

                                    this.setState({
                                        loading: false
                                    })

                                    var body = {
                                        socketId: this.state.socketId,
                                        videoUrl: this.state.videoUrl
                                    }
                                    await axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/streaming/stream/delete", body);

                                    window.location.reload()
                                }
                            }
                            recorder.start(200)
                        }).catch(error => console.error(error));
                }).catch(error => console.error(error));

        }
    }
    stopStreaming = async () => {
        this.setState({
            endStream: true,
            startStream: false,
        })
        this.state.video.getTracks().forEach(function (track) {
            track.stop();
        });


    }
    getmessage = (event) => {
        this.setState({ message: event.target.value })
    }
    sendTheMessage = () => {
        this.state.socket.emit('message', this.state.socketId, this.state.message, this.state.user);
        document.getElementById('message').value = '';

    }

    onDrag = (e) => {
        var directionClass = e.additionalEvent;
        var chat = document.getElementById('chat');
        if (this.state.isChatShowing && directionClass === "panleft") {
            chat.classList.add("panleft");
            this.setState({
                isChatShowing: !this.state.isChatShowing
            })
        } else if (!this.state.isChatShowing && directionClass === "panright") {
            chat.classList.remove('panleft');
            this.setState({
                isChatShowing: !this.state.isChatShowing
            })
        }
    }

    render() {
        return (
            <Layout>
                <div className="stream grid">
                    <div className="playback_section">
                        <div className="header_section">
                            <h2>Stream preview</h2>
                            <p>Start your stream and follow your chat.</p>
                        </div>
                        <Hammer onPan={this.onDrag}>
                            <div className="playback">
                                <div className="chat" id="chat">
                                    <div className="messages" id="messages">
                                    </div>
                                    <div className="chat_text">
                                        <input className="input-dark" type="text" placeholder="Send a message" id='message' onChange={this.getmessage} autoComplete="off" />
                                        <input type="button" className="button button--smaller" value="Send" onClick={this.sendTheMessage} />
                                    </div>
                                </div>
                                <div className="player">
                                    <ReactPlayer
                                        muted={true}
                                        className="playback_player"
                                        width={"100%"}
                                        url={this.state.video ?? this.state.playbackUrl}
                                        playing
                                        controls={true}
                                    />
                                </div>
                                <div className="chat_text">
                                    <input className="input-dark" type="text" placeholder="Send a message" onChange={this.getmessage} autoComplete="off" />
                                    <input type="button" className="button button--smaller" value="Send" onClick={this.sendTheMessage} />
                                </div>
                            </div>
                        </Hammer>
                    </div>
                    <div className="settings_section">
                        <div className="header_section">
                            <h2>Stream configuration</h2>
                            <p>Get your stream ready and updated.</p>
                        </div>
                        <div className="settings">
                            <div className="settings-row">
                                <div className="row_label">
                                    <h4>Stream key</h4>
                                    <p>Some additionnal infos about the stream key.</p>
                                </div>
                                <div className="row_content stream_key">
                                    <input className="input-dark" type="text" defaultValue={this.state.streamKey} autoComplete="off" />
                                    <input type="button" className="button button--smaller" value="Generate" onClick={this.createChannel} />
                                    <input type="button" className="button button--smaller" value="Copy" onClick={() => {
                                        this.copyToClipBoard(this.state.streamKey);
                                    }} />
                                </div>
                            </div>
                            <hr />
                            <div className="settings-row">
                                <div className="row_label">
                                    <h4>Ingest server</h4>
                                    <p>Some additionnal infos about the stream key.</p>
                                </div>
                                <div className="row_content">
                                    <input className="input-dark" type="text" defaultValue={this.state.rtmps} autoComplete="off" />
                                    <input type="button" className="button button--smaller" value="Copy" onClick={() => {
                                        this.copyToClipBoard(this.state.rtmps);
                                    }} />
                                </div>
                            </div>
                            <hr />
                            <div className="settings-row">
                                <div className="row_label">
                                    <h4>Share from browser</h4>
                                    <p>If you do not have third party to stream.</p>
                                </div>
                                <div className="row_content share_section">
                                    <input type="button" className="button button--smaller button-primary" value="Start streaming" onClick={() => this.startStreaming()} />
                                    <div className="stream_actions">
                                        <div className={`actions_icon ${this.state.sounD && "disabled"}`} id='ICON'>
                                            {
                                                !this.state.sounD ? <FiMic /> : <FiMicOff />
                                            }
                                        </div>
                                        <div className={`actions_icon ${!this.state.videO && "disabled"}`} id='ICON'>
                                            {
                                                this.state.videO ? <FiVideo /> : <FiVideoOff />
                                            }
                                        </div>
                                        <div className={`actions_icon ${!this.state.screeN && "disabled"}`} id='ICON'>
                                            {
                                                this.state.screeN ? <MdScreenShare /> : <MdStopScreenShare />
                                            }
                                        </div>
                                    </div>
                                    <input type="button" className="button button--smaller button-danger" value="Stop screen" onClick={() => this.stopStreaming()} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="streaminfo_section">
                        <div className="header_section">
                            <h2>Stream informations</h2>
                            <p>Keep updating what's your stream about.</p>
                        </div>
                        <div className="stream_info">
                            <div className="grid">
                                <div className="form-group">
                                    <label>Stream title</label>
                                    <input type="text" className="input-dark" placeholder="Enter title for your stream." onChange={this.changeTitle} value={this.state.title} />
                                </div>
                                <div className="form-group">
                                    <label>Stream description</label>
                                    <textarea type="text" className="input-dark" cols="0" rows="7" placeholder="Describe what your stream is about." onChange={this.changeDesc} value={this.state.description} ></textarea>
                                </div>
                                <div className="form-group">
                                    <label>Stream miniature</label>
                                    <div className="miniature">
                                        <img src={this.state.image.preview ?? Miniature} alt="Upload miniature" />
                                        <div className="upload">
                                            <input type="file" accept="image/*" id="input-upload" onChange={this.handleChange} hidden />
                                            <input type="button" className="button button--small button--white" value="Choose file" onClick={this.onUpload} />
                                            <p>{this.state.image.raw ? this.state.image.raw.name : "Choose file"}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="alert alert-info">
                                    The miniature size should be 1200px x 720px.
                                </p>
                                <div>
                                    <input type="submit" className="button button--smaller small" value="Publish Stream" onClick={this.publishStream} />
                                </div>
                            </div>
                            <br />
                            {/* {
                                this.state.msg && <p className="alert alert-success">{this.state.msg}</p>
                            } */}

                        </div>
                    </div>
                </div>
                {
                    this.state.loading === true && <Spinner />
                }
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    video: state.stream.stream,
    published: state.stream.published,
    title: state.stream.title,
    description: state.stream.description,
    miniature: state.stream.miniature,
    startStream: state.stream.startStream,
    endStream: state.stream.endStream,
    messages: state.stream.messages
});

export default connect(mapStateToProps, { setStream, setTitle, setDescription, setMiniature, setStart, setEnd, setMessages })(Stream);