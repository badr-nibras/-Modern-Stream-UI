import './Game.scss';
import { Component } from 'react';
import Layout from '../../../Layouts/Layout';
import GameCover from '../../../assets/images/gameCover.jpg';
import Avatar from '../../Avatar/Avatar';
import gamePicture1 from '../../../assets/images/card1.jpg';
import axios from "axios";
import Swal from 'sweetalert2'
import Spinner from '../../Utils/Spinner/Spinner'

import {
    RiImageEditFill
} from 'react-icons/ri'

class CreateGame extends Component {
    state = {
        name: "",
        description: "",
        image: {
            preview: null,
            raw: null
        },
        cover: {
            preview: null,
            raw: null
        },
        error: "",
        loading: false
    }

    // Change game icon
    onImageClick = (e) => {
        e.preventDefault();
        window.document.getElementById('image-upload').click();
    }

    onImageChange = (e) => {
        if (e.target.files.length) {
            this.setState({
                image: {
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                }
            });
        }
    };

    // Change game cover
    onCoverEdit = (e) => {
        e.preventDefault();
        window.document.getElementById('cover-upload').click();
    }

    onCoverChange = (e) => {
        if (e.target.files.length) {
            this.setState({
                cover: {
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                }
            });
        }
    };

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onDescriptionChange = (e) => {
        this.setState({
            description: e.target.value
        })
    }

    onSubmit = () => {
        this.setState({
            loading: true
        })
        var game = new FormData()
        game.append('files', this.state.image.raw)
        game.append('title', this.state.name)
        game.append('description', this.state.description)
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/games/create', game)
        .then(res => {
            this.setState({
                loading: false
            })
            if(res.data.message) {
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
    }

    render() { 
        return (
            <Layout>
                <div className="game_section">
                    <img src={this.state.cover.preview ?? GameCover} alt="Game cover" />
                    <div className="overlay"></div>
                    <RiImageEditFill className="edit_cover" onClick={this.onCoverEdit}/>
                    <input type="file" accept="image/*" id="cover-upload" onChange={this.onCoverChange} hidden/>
                    <div className="game_container container">
                        <div className="game_content">
                            <Avatar img={{ src: this.state.image.preview ?? gamePicture1, size: "xl-large", border: false }} onClick={this.onImageClick} />
                            <input type="file" accept="image/*" id="image-upload" onChange={this.onImageChange} hidden/>
                            <div className="game_info">
                                <h2>{ this.state.name ?? "Game Name" }</h2>
                                <p className="description">{ this.state.description ?? "Game Description" }</p>
                            </div>
                        </div>
                    </div>
                    <div className="game_content padding">
                        <div className="header_section">
                            <h2>Game informations</h2>
                            <p>Those informations will show up in game details.</p>
                        </div>
                        {
                            this.state.error && (
                                <div className="alert alert-danger">
                                    {this.state.error}
                                </div>
                            )
                        }
                        <div className="game_infos grid">
                            <div>
                                <h5>Game name :</h5>
                                <input type="text" className="input-dark" placeholder="Enter the name of the game" onChange={this.onNameChange}/>
                            </div>
                            <div>
                                <h5>Bio :</h5>
                                <textarea className="input-dark" cols="1" rows="7" placeholder="Enter the description of the game" onChange={this.onDescriptionChange}></textarea>
                            </div>
                            <div>
                                <input type="submit" className="button button--small" value="Publish" onClick={this.onSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.loading === true &&  <Spinner />
                }
            </Layout>
        );
    }
}
 
export default CreateGame;