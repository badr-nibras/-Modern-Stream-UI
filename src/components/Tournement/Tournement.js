import React from 'react';
import './Tournement.scss';
import axios from "axios";
import game1 from '../../assets/images/game1.jpg';
import Layout from '../../Layouts/Layout';
import {
    RiImageEditFill
} from 'react-icons/ri'
//import SelectGame from './SelectGame/SelectGame';
import Swal from 'sweetalert2'
import Spinner from '../Utils/Spinner/Spinner'

class Tournement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: localStorage.getItem("userId"),
            title: "",
            type: "",
            players: "",
            team: "",
            game: "",
            msg: "",
            image: {
                preview: null,
                raw: null
            },
            games: [
                {
                    title: "pubg",
                    image: game1,
                },
                {
                    title: "fifa",
                    image: game1,
                },
            ],
            loading: false
        }
    }

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/games/`)
            .then(res => {
                if (res.data != null) {
                    this.setState({
                        games: res.data
                    })
                }
            })
    }

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
        }
    };

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    changeType = (e) => {
        this.setState({
            type: e.target.value
        })
    }
    changeGame = async (gameTitle) => {
        await this.setState({
            game: gameTitle
        })
    }
    changeTeam = (e) => {
        this.setState({
            team: e.target.value
        })
    }
    changePlayers = (e) => {
        this.setState({
            players: e.target.value
        })
    }

    Submit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
        var tournoi = new FormData()
        tournoi.append('files', this.state.image.raw)
        tournoi.append('title', this.state.title)
        tournoi.append('type', this.state.type)
        tournoi.append('players', this.state.players)
        tournoi.append('team', this.state.team)
        tournoi.append('game', this.state.game)
        tournoi.append('creator', this.state.id)

        axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/tournement/create", tournoi)
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
                <div className="tournement" >
                    <div className="image">
                        <img src={this.state.image.preview ?? "https://www.sortiraparis.com/images/58/74061/581774-fifa-21-le-classement-des-100-meilleurs-joueurs-11.jpg"} alt="Tournement" />
                        <RiImageEditFill className="edit_cover" onClick={this.onImageClick} />
                        <input type="file" accept="image/*" id="image-upload" onChange={this.onImageChange} hidden />
                    </div>
                    <hr />
                    <div className="header_section">
                        <h2>Create Tournement</h2>
                        <p>Costumize your tournemnt.</p>
                    </div>
                    <div className="tournement_container grid">
                        <div className="inputs-grid grid">
                            <div className="form-group">
                                <label htmlFor="tour-title">Tournement Title <span>*</span></label>
                                <input className="input-dark" type="text" name="tour-title" placeholder="my_Tournement" onChange={this.changeTitle} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Tournement Type <span>*</span></label>
                                <select className="input-dark" name="Type" onChange={this.changeType} >
                                    <option className="type" value="" disabled selected>Select a type</option>
                                    <option value="Double elimination 1">Double elimination 1</option>
                                    <option value="Double elimination 2">Double elimination 2</option>
                                    <option value="Double elimination 3">Double elimination 3</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="num-players1">Number of players <span>*</span></label>
                                <select className="input-dark" name="Type" onChange={this.changePlayers} >
                                    <option className="type" value="" disabled selected>Select Number of players</option>
                                    <option value="32">32 players</option>
                                    <option value="4">4 players</option>
                                    <option value="8">8 players</option>
                                    <option value="16">16 players</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="num-players2">Number of players per team <span>*</span></label>
                                <select className="input-dark" name="Type" onChange={this.changeTeam} >
                                    <option className="type" value="" disabled selected>Select Team</option>
                                    <option value="1 player">1 player</option>
                                    <option value="2 players">2 players</option>
                                    <option value="3 players">3 players</option>
                                    <option value="4 players">4 players</option>
                                    <option value="5 players">5 players</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="game-element">
                                <label htmlFor="game">Game <span>*</span></label>
                                <ul>
                                    {this.state.games.map((game, i) => (
                                        <li key={i} onClick={() => this.changeGame(game.title)}>
                                            <div className={`gamediv ${this.state.game !== game.title && "disabled"}`}>
                                                <ul>
                                                    <li>
                                                        <img className="game game-circle" src={game.image} alt="game" />
                                                    </li>
                                                    <li>
                                                        <p>{game.title}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <input type="submit" className="button button--small" value="Create Tournement" onClick={this.Submit} />
                        </div>
                        {/* {
                            this.state.msg && <div className="alert alert-info">
                                {this.state.msg}
                            </div>
                        } */}
                    </div >
                </div>
                {
                    this.state.loading === true &&  <Spinner />
                }
            </Layout>
        );
    }
}

export default Tournement;
