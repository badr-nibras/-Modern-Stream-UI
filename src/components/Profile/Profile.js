import React from 'react';
import Background from '../../assets/images/background_profil.jpg';
//import ProfilImage from '../../assets/images/profil.jpg';
import './Profile.scss';
import Avatar from '../Avatar/Avatar';
import Layout from '../../Layouts/Layout';
//import RecordVideo from './RecordVideo/RecordVideo'
//import LiveVideo1 from '../../assets/images/live1.jpg';
import Profil from '../../assets/images/profil.jpg';
import LiveVideo from '../Stream/LiveVideo/LiveVideo';
import Followers from './Followers/Followers';
import {
    RiLiveLine,
    RiImageEditFill
} from 'react-icons/ri';
import {
    IoGameControllerOutline
} from 'react-icons/io5';

import {
   
    AiOutlineApartment,
   
} from 'react-icons/ai';
import axios from "axios";
import {
    MdPersonPin,
    MdSupervisorAccount,
    MdRssFeed

} from 'react-icons/md'
import {
    BiVideoRecording
} from 'react-icons/bi'


class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
            id: localStorage.getItem("userId"),
            channelId: localStorage.getItem("visitedChannelId"),
            user: "",
            image: {
                preview: null,
                raw: null
            },
            cover: {
                preview: null,
                raw: null
            },
            me: [],
            followers: 0,
            followings: 0,
            isFollowing: false,
            currentBloc: 0,
            paypal: ""
        }
    }
    blocs = [
        { link: "About", icon: <MdPersonPin />, component: <About /> },
        { link: "Streams", icon: <BiVideoRecording />, component: <MyStreams /> },
        {link: "Followers", icon: < MdSupervisorAccount />, component: <Followers /> },
        {link: "Following", icon: <MdRssFeed />, component: <Followers /> },
        {link: "Tournaments", icon: <AiOutlineApartment />, component: <Followers /> }
    ]

    // Change profile icon
    onImageClick = (e) => {
        e.preventDefault();
        window.document.getElementById('image-upload').click();
    }

    onImageChange = async (e) => {
        if (e.target.files.length) {
            await this.setState({
                image: {
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                }
            });
            this.UploadProfilePic()
        }
    };

    // Change profile cover
    onCoverEdit = (e) => {
        e.preventDefault();
        window.document.getElementById('cover-upload').click();
    }

    onCoverChange = async (e) => {
        if (e.target.files.length) {
            await this.setState({
                cover: {
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                }
            });
            this.UploadCoverPic()
        }
    };

    UploadProfilePic = (e) => {
        var fd = new FormData()
        fd.append('files', this.state.image.raw)
        fd.append('id', this.state.id)
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/user/uploadProfilePic', fd)
            .then((res) => {
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
    }
    UploadCoverPic = (e) => {
        var fd = new FormData()
        fd.append('files', this.state.cover.raw)
        fd.append('id', this.state.id)
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/user/uploadCoverPic', fd)
            .then((res) => {
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
    }

    onTapNavItem = (index) => {
        this.setState({
            currentBloc: index
        });
    }

    async componentDidMount() {
        if (this.state.channelId === "") {
            axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${this.state.id}`)
                .then(res => {
                    this.setState({
                        user: res.data[0],
                        followers: res.data[0].followers.length,
                        followings: res.data[0].followings.length,
                        paypal: res.data[0].paypal
                    })
                })
        } else {
            await axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${this.state.channelId}`)
                .then(res => {
                    this.setState({
                        user: res.data[0],
                        followers: res.data[0].followers.length,
                        followings: res.data[0].followings.length,
                        paypal: res.data[0].paypal
                    })
                })
            axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${this.state.id}`)
                .then(res => {
                    this.setState({
                        me: res.data[0],
                    })
                })

            const isFollowing = {
                channel: this.state.user.username,
                channelId: this.state.channelId
            }
            axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/user/check/${this.state.id}`, isFollowing)
                .then(res => {
                    this.setState({
                        isFollowing: res.data
                    })
                })
        }
        this.setState({
            image: {
                preview: this.state.user.coverUrl,
                raw: null
            },
        })
    }
    follow = () => {
        if (!this.state.isFollowing) {
            const userToFollow = {
                username: this.state.user.username,
                id: this.state.channelId,
                myname: this.state.me.username
            }
            axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/user/follow/${this.state.id}`, userToFollow)
                .then(res => {
                    this.setState({
                        response: res.data
                    })
                })
        } else {
            const userToUnFollow = {
                channel: this.state.user.username,
                channelId: this.state.channelId,
            }
            axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/user/unfollow/${this.state.id}`, userToUnFollow)
                .then(res => {
                    this.setState({
                        response: res.data
                    })
                })
        }
    }

    donate = () => {
        const paypalURL = `https://paypal.me/${this.state.paypal}`
        window.open(
            paypalURL,
            "_blank",
            "width=auto,height=auto"
        );
    }


    render() {
        return (
            <Layout>
                <div className="profile">
                    <img src={this.state.cover.preview ?? Background} alt="Profile background" />
                    <div className="overlay"></div>
                    {
                        this.state.channelId === "" && (
                            <>
                                <RiImageEditFill className="edit_cover" onClick={this.onCoverEdit} />
                                <input type="file" accept="image/*" id="cover-upload" onChange={this.onCoverChange} hidden />
                            </>
                        )
                    }
                    <div className="profile_container ">
                        <div className="profile_content ">
                            <Avatar className="avatar" img={{ src: this.state.image.preview ?? this.state.user.photoUrl, size: "x-large", border: true }} onClick={this.state.channelId === "" && this.onImageClick} />
                            {
                                this.state.channelId === "" && (
                                    <input type="file" accept="image/*" id="image-upload" onChange={this.onImageChange} hidden />
                                )
                            }
                            <div className="profile_info">
                                <h2 className="user">{this.state.user.username} </h2>
                                <p className="user">@{this.state.user.username}</p>
                                <div className="profile_followers">
                                    <p>{this.state.followings}  Following</p>
                                    <p>{this.state.followers}  Followers</p>

                                </div>
                                {this.state.channelId === "" ? (<p></p>) : (
                                    <div className="profile_actions">
                                        <input type="button" className="button button--smaller" value={this.state.isFollowing ? "Unfollow" : "Follow"} onClick={this.follow} />
                                        {this.state.paypal !== undefined &&
                                            (<input type="button" className="button button--smaller" value="Donate" onClick={this.donate} />)
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                        <br />
                        {
                            this.state.response && <p className="alert alert-info">{this.state.response}</p>
                        }
                        {this.state.channelId !== "" ? (<p></p>) : (
                            <div className="buttons">
                                <a href="/stream">
                                    <RiLiveLine className="button_icon" />
                                    Start Streaming
                                </a>
                                <a href="/tournement">
                                    <IoGameControllerOutline className="button_icon" onClick={() => this.openModal()} />
                                    Create Tournement
                                </a>
                            </div>
                        )}
                    </div>
                    <ul className="nav nav_list">
                        {
                            this.blocs.map((bloc, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={`nav_item ${index === this.state.currentBloc && "active_item"} `}
                                        onClick={() => {
                                            this.onTapNavItem(index)
                                        }}
                                    >
                                        
                                        <div className="nav_link">
                                            <div className="button_icon">{bloc.icon}</div>
                                            {bloc.link}
                                        
                                            
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                    {
                        this.blocs.map((bloc, index) => {
                            return (
                                <div key={index} style={{ display: this.state.currentBloc !== index ? "none" : "" }}>
                                    {bloc.component}
                                </div>
                            );
                        })
                    }
                </div>
            </Layout>
        );
    }
}

class About extends React.Component {

    state = {
        isDisabled: true,
        id: localStorage.getItem("userId"),
        channelId: localStorage.getItem("visitedChannelId"),
        user: "",
        message: "",
        image: {
            preview: null,
            raw: null
        },
        files: [],
        insta: "",
        facebook: "",
        paypal: "",
        bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat beatae debitis repudiandae voluptate nihil culpa aliquid pariatur, cum a eius eum tempora optio nostrum voluptatem quibusdam dolore, aspernatur odio dolor!"
    }

    handleChange = async (e) => {
        if (e.target.files.length) {
            await this.setState({
                image: {
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                },
                files: e.target.files
            });
        }
    };

    onUpload = (e) => {
        e.preventDefault();
        window.document.getElementById('input-upload').click();
    }

    UploadToMongoDb = (e) => {
        var fd = new FormData()
        fd.append('files', this.state.image.raw, this.state.image.raw.name)
        fd.append('id', this.state.id)
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/user/uploadImg', fd)
            .then((res) => {
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
    }

    onTapEdit = () => {
        const updateUser = {
            username: this.state.username,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            bio: this.state.bio,
            facebook: this.state.facebook,
            instagram: this.state.insta,
            paypal: this.state.paypal
        }
        if (this.state.isDisabled === false) {
            axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/user/updateUser/${this.state.id}`, updateUser)
                .then(res => {
                    console.log(res)
                    this.setState({
                        message: res.data
                    })
                })

        }
        this.setState({
            isDisabled: !this.state.isDisabled
        })
    }

    changeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    changePhoneNumber = (e) => {
        this.setState({
            phoneNumber: e.target.value
        })
    }

    changeBio = (e) => {
        this.setState({
            bio: e.target.value
        })
    }

    changeFacebook = (e) => {
        this.setState({
            facebook: e.target.value
        })
    }

    changeInsta = (e) => {
        this.setState({
            insta: e.target.value
        })
    }

    changePaypal = (e) => {
        this.setState({
            paypal: e.target.value
        })
    }

    componentDidMount() {
        if (this.state.channelId === "") {
            axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${this.state.id}`)
                .then(res => {
                    this.setState({
                        user: res.data[0],
                        username: res.data[0].username,
                        email: res.data[0].email,
                        phoneNumber: res.data[0].phoneNumber,
                        facebook: res.data[0].facebook,
                        insta: res.data[0].instagram,
                        paypal: res.data[0].paypal
                    })
                })
        } else {
            axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${this.state.channelId}`)
                .then(res => {
                    this.setState({
                        user: res.data[0],
                        username: res.data[0].username,
                        email: res.data[0].email,
                        phoneNumber: res.data[0].phoneNumber,
                        facebook: res.data[0].facebook,
                        insta: res.data[0].instagram,
                        paypal: res.data[0].paypal
                    })
                })
        }
    }

    changePass = () => {
        window.location.href = "/change-pass"
    }

    render() {
        return (
            <div className="profile_section">
                <div className="section_header">
                    <div>
                        <h2>Profile Settings</h2>
                        <p>This is you, take care of it.</p>
                    </div>
                    <div>
                        {this.state.channelId === "" ? (
                            <input type="button" className="button button--smaller" value={this.state.isDisabled ? "Edit" : "Save"} onClick={() => {
                                this.onTapEdit();
                            }} />
                        ) : (
                            <p></p>
                        )}

                    </div>
                </div>
                <br />
                <div className="about grid">
                    <div className="about_row">
                        <h5>Username: </h5>
                        <input type="text" className={this.state.isDisabled ? "input-disabled" : "input-dark"} value={this.state.username} disabled={this.state.isDisabled} onChange={this.changeUsername} />
                    </div>
                    <div className="about_row">
                        <h5>Email address: </h5>
                        <input type="text" className={this.state.isDisabled ? "input-disabled" : "input-dark"} value={this.state.email} disabled={this.state.isDisabled} onChange={this.changeEmail} />
                    </div>
                    <div className="about_row">
                        <h5>Phone number: </h5>
                        <input type="text" className={this.state.isDisabled ? "input-disabled" : "input-dark"} value={this.state.phoneNumber} disabled={this.state.isDisabled} onChange={this.changePhoneNumber} />
                    </div>
                    <div className="about_row">
                        <h5>Bio: </h5>
                        <textarea className={this.state.isDisabled ? "input-disabled" : "input-dark"} cols="1" rows="7" disabled={this.state.isDisabled} onChange={this.changeBio} >
                            {this.state.bio}
                        </textarea>
                    </div>
                    <div className="about_row">
                        <input type="button" className="button button--smaller" value="Change Password" onClick={this.changePass} />
                    </div>

                    {(this.state.paypal !== undefined || this.state.channelId === "") &&
                        (
                            <div className="about_row">
                                <h5>Paypal username: </h5>
                                <input type="text" className={this.state.isDisabled ? "input-disabled" : "input-dark"} value={this.state.paypal} disabled={this.state.isDisabled} onChange={this.changePaypal} />
                            </div>
                        )
                    }
                    {/*<div className="about_row">
                        <h5>Profile picture :</h5>
                        <div className="miniature">
                            <img src={this.state.image.preview ?? ProfilImage} alt="Upload miniature"/>
                            <div className="upload">
                                <input type="file" accept="image/*" id="input-upload" onChange={this.handleChange} hidden/>
                                <input type="button" className="button button--small button--white" value="Choose file" onClick={this.onUpload}/>
                                <p>{this.state.image.raw ? this.state.image.raw.name : "Choose file"}</p> <br />
                                <input type="button" className="button button--small button--white" value="Save" onClick={this.UploadToMongoDb}/>
                            </div>
                        </div>
                    </div>*/}
                    <div className="about_row">
                        <h5>Social Media :</h5>
                        <div className="about_social">
                            <p>Facebook</p>
                            <input type="text" className={this.state.isDisabled ? "input-disabled" : "input-dark"} value={this.state.facebook} disabled={this.state.isDisabled} onChange={this.changeFacebook} />
                        </div>
                        <div className="about_social">
                            <p>Instagram</p>
                            <input type="text" className={this.state.isDisabled ? "input-disabled" : "input-dark"} value={this.state.insta} disabled={this.state.isDisabled} onChange={this.changeInsta} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class MyStreams extends React.Component {

    state = {
        id: localStorage.getItem("userId"),
        channelId: localStorage.getItem("visitedChannelId"),
        arn: localStorage.getItem("arn"),
        user: "",
        channelArn: "",
        streams: [],
        vods: []
    }

    async componentDidMount() {
        if (this.state.channelId === "") {
            await axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${this.state.id}`)
                .then(res => {
                    this.setState({
                        user: res.data[0],
                        channelArn: res.data[0].channelArn
                    })
                })
        } else {
            await axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${this.state.channelId}`)
                .then(res => {
                    this.setState({
                        user: res.data[0],
                        channelArn: res.data[0].channelArn
                    })
                })
        }
        for (var i = 0; i < this.state.channelArn.length; i++) {
            const channelArn = {
                arn: this.state.channelArn[i]
            }
            await axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/streaming/vodByArn`, channelArn)
                .then(res => {
                    this.setState({
                        streams: this.state.streams.concat(res.data)
                    })
                })
        }
        this.setState({
            vods: this.state.streams
        })

        //recherche
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
        }

    };


    render() {
        return (
            <div className="profile_section">
                <div className="header_section">
                    <h2>Lives Created</h2>
                    <p>All your streams are listed here.</p>
                </div>
                <div className="mystreams">
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
                                    playbackUrl: vod.url
                                }}
                            />
                        );
                    })}

                </div>
            </div>
        );
    }
}

export default Profile;
