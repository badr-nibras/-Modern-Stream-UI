import React from 'react';
import './Tourbracket.scss';
import Layout from '../../Layouts/Layout'
import winner from '../../assets/images/winner.png'
import axios from 'axios'
import { FaGreaterThan, FaPen, FaSave } from 'react-icons/fa';
import Spinner from '../Utils/Spinner/Spinner'
import Streams from './Streams';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};


var round1 = [
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" }
];
var round2 = [
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" }
];
var round3 = [
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" }
];
var round4 = [
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" }
];
var round5 = [
    { team: "", player: "", playerId: "" },
    { team: "", player: "", playerId: "" }
];

class Tourbracket extends React.Component {

    state = {
        isDisabled: true,
        id: localStorage.getItem("userId"),
        tourId: localStorage.getItem("tourId"),
        isOwner: false,
        user: "",
        image: {
            preview: null,
            raw: null
        },
        rounds: [],
        streams: [],
        winner: "",
        message: "",
        loading: false,
        joined: false,
        watch: "false"
    }
    passToRound2 = (joueur, joueurId) => {
        const player = {
            player: joueur,
            playerId: joueurId
        }
        axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/tournement/join2/${this.state.tourId}`, player)
            .then(res => {
                this.setState({
                    message: res.data
                })
            })
        window.location.reload()

    }
    passToRound3 = async (joueur, joueurId) => {
        const player = {
            player: joueur,
            playerId: joueurId
        }
        await axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/tournement/join3/${this.state.tourId}`, player)
            .then(res => {
                this.setState({
                    message: res.data
                })
            })
        window.location.reload()

    }
    passToRound4 = (joueur, joueurId) => {
        const player = {
            player: joueur,
            playerId: joueurId
        }
        axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/tournement/join4/${this.state.tourId}`, player)
            .then(res => {
                this.setState({
                    message: res.data
                })
            })

    }
    passToRound5 = (joueur, joueurId) => {
        const player = {
            player: joueur,
            playerId: joueurId
        }
        axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/tournement/join5/${this.state.tourId}`, player)
            .then(res => {
                this.setState({
                    message: res.data
                })
            })

    }
    winner = (joueur, joueurId) => {
        const player = {
            winner: joueur,
            winnerId: joueurId
        }
        axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/tournement/winner/${this.state.tourId}`, player)
            .then(res => {
                this.setState({
                    message: res.data
                })
            })

    }
    onTapEdit = () => {
        this.setState({
            isDisabled: !this.state.isDisabled
        })
    }
    onTap = () => {
        this.setState({
            isDisabled: true
        })
    }

    onTapJoin = () => {
        const player = {
            player: this.state.user,
            playerId: this.state.id
        }
        axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/tournement/join/${this.state.tourId}`, player)
            .then(res => {
                this.setState({
                    message: res.data,
                    //TODO: check if request is 200
                    joined: true
                })
            })
    }

    async componentDidMount() {
        this.setState({
            loading: true
        })
        await axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${this.state.id}`)
            .then(res => {
                this.setState({
                    user: res.data[0].username
                })
            })

        await axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/tournement/${this.state.tourId}`)
            .then(res => {
                this.setState({
                    creator: res.data.creator,
                    rounds: res.data.rounds,
                    winner: res.data.winner,
                    r1: res.data.round1Participents,
                    r2: res.data.round2Participents,
                    r3: res.data.round3Participents,
                    r4: res.data.round4Participents,
                    r5: res.data.round5Participents
                })

                for (var i = 0; i < this.state.r1.length; i++) {
                    round1[i] = this.state.r1[i]
                }
                for (var j = 0; j < this.state.r2.length; j++) {
                    round2[j] = this.state.r2[j]
                }
                for (var k = 0; k < this.state.r3.length; k++) {
                    round3[k] = this.state.r3[k]
                }
                for (var l = 0; l < this.state.r4.length; l++) {
                    round4[l] = this.state.r4[l]
                }
                for (var n = 0; n < this.state.r5.length; n++) {
                    round5[n] = this.state.r5[n]
                }
                if (this.state.creator === this.state.id) {
                    this.setState({
                        isOwner: true
                    })
                }
                this.setState({
                    loading: false
                })
            })
        sleep(400).then(() => {
            this.onTap()
        })
        for (var a = 0; a < round1.length; a++) {
            if (round1[a].playerId !== "") {
                axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/streaming/streamByUser/${round1[a].playerId}`)
                    .then(res => {
                        this.setState({
                            streams: this.state.streams.concat(res.data)
                        })
                    })
            }
        }
        for (var t = 0; t < round1.length; t++) {
            if (round1[t].playerId === this.state.id) {
                this.setState({
                    joined: true
                })
            }
        }
    }

    onTapWatch = (e) => {
        this.setState({
            watch: "true"
        })
        // window.location.href = '/tournements/streams';
    }

    render() {

        return (
            this.state.watch === "true" ? (
                <Streams streams={this.state.streams} />
            ) : (
                <Layout>
                    <div className="tournament-container">
                        <div className="section_header padding">
                            <div>
                                <h2>Tour bracket</h2>
                                <p>Track and watch the tournement details.</p>
                            </div>
                            <div className="actions">
                                {
                                    !(this.state.isOwner || this.state.joined) ? (
                                        <input type="button" className="button button--smaller" value="Join" onClick={() => {
                                            this.onTapJoin();
                                        }} />
                                    ) : (
                                        <input type="button" className="button button--smaller" value="Start stream" onClick={() => {
                                            window.location.href = "/stream";
                                        }} />
                                    )
                                }
                                <input type="button" className="button button--smaller" value="Watch streams" onClick={() => {
                                    this.onTapWatch();
                                }} />
                            </div>
                        </div>
                        <br />
                        {
                            this.state.message && <p className="alert alert-info">{this.state.message}</p>
                        }
                        <div className="tournament-headers">
                            {this.state.rounds.map((round, key) => (
                                <h3 key={key}>{round.round}</h3>
                            ))}
                            <h3>Winner</h3>
                        </div>
                        {/*this.state.rounds.map((round, key) => (
                            <ul className={`bracket bracket-${key + 1}`}>
                                {key === 0 ? (
                                    this.state.round1.map((players, i) => (
                                        <li className="team-item">
                                            <input type="text" className={this.state.isDisabled ? "tour-input" : "tour-input-edit"} value={players.player} disabled={this.state.isDisabled} />
                                            <input type="text" className={this.state.isDisabled ? "time-input" : "time-input-edit"} value="14:00" disabled={this.state.isDisabled} />
                                            <input type="text" className={this.state.isDisabled ? "tour-input" : "tour-input-edit"} value={players.player} disabled={this.state.isDisabled} />  </li>
                                    ))
                                ) : key === 1 ? (
                                    this.state.round2.map((players, i) => (
                                        <li className="team-item"> <input type="text" className={this.state.isDisabled ? "tour-input" : "tour-input-edit"} value={players.player} disabled={this.state.isDisabled} />   <input type="text" className={this.state.isDisabled ? "time-input" : "time-input-edit"} value="14:00" disabled={this.state.isDisabled} />    <input type="text" className={this.state.isDisabled ? "tour-input" : "tour-input-edit"} value={players.player} disabled={this.state.isDisabled} />  </li>
                                    ))
                                ) : key === 2 ? (
                                    this.state.round3.map((players, i) => (
                                        <li className="team-item"> <input type="text" className={this.state.isDisabled ? "tour-input" : "tour-input-edit"} value={players.player} disabled={this.state.isDisabled} />   <input type="text" className={this.state.isDisabled ? "time-input" : "time-input-edit"} value="14:00" disabled={this.state.isDisabled} />    <input type="text" className={this.state.isDisabled ? "tour-input" : "tour-input-edit"} value={players.player} disabled={this.state.isDisabled} />  </li>
                                    ))
                                ) : key === 3 ? (
                                    this.state.round4.map((players, i) => (
                                        <li className="team-item"> <input type="text" className={this.state.isDisabled ? "tour-input" : "tour-input-edit"} value={players.player} disabled={this.state.isDisabled} />   <input type="text" className={this.state.isDisabled ? "time-input" : "time-input-edit"} value="14:00" disabled={this.state.isDisabled} />    <input type="text" className={this.state.isDisabled ? "tour-input" : "tour-input-edit"} value={players.player} disabled={this.state.isDisabled} />  </li>
                                    ))
                                ) : (
                                    this.state.round5.map((players, i) => (
                                        <li className="team-item"> <input type="text" className={this.state.isDisabled ? "tour-input" : "tour-input-edit"} value={this.state.round1[0].player} disabled={this.state.isDisabled} />   <input type="text" className={this.state.isDisabled ? "time-input" : "time-input-edit"} value="14:00" disabled={this.state.isDisabled} />    <input type="text" className={this.state.isDisabled ? "tour-input" : "tour-input-edit"} value={this.state.user.username} disabled={this.state.isDisabled} />  </li>
                                    ))
                                )}
                            </ul>
                        ))*/}
                        {this.state.rounds.length === 5 ? (
                            <div className="tournament-brackets">
                                <ul className="bracket bracket-1">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[0].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound2(round1[0].player, round1[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[1].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[1].player, round1[1].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[2].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound2(round1[2].player, round1[2].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[3].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[3].player, round1[3].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[4].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[4].player, round1[4].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[5].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[5].player, round1[5].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[6].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[6].player, round1[6].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[7].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[7].player, round1[7].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[8].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[8].player, round1[8].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[9].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[9].player, round1[9].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[10].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[10].player, round1[10].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[11].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[11].player, round1[11].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[12].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[12].player, round1[12].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[13].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[13].player, round1[13].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[14].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[14].player, round1[14].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[15].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[15].player, round1[15].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[16].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound2(round1[16].player, round1[16].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[17].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[17].player, round1[17].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[18].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound2(round1[18].player, round1[18].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[19].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[19].player, round1[19].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[20].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[20].player, round1[20].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[21].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[21].player, round1[21].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[22].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[22].player, round1[22].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[23].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[23].player, round1[23].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[24].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[24].player, round1[24].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[25].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[25].player, round1[25].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[26].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[26].player, round1[26].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[27].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[27].player, round1[27].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[28].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[28].player, round1[28].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[29].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[29].player, round1[29].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[30].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[30].player, round1[30].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[31].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[31].player, round1[31].playerId)} />) : (<></>)}  </li>
                                </ul>
                                <ul className="bracket bracket-2">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[0].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound3(round2[0].player, round2[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[1].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[1].player, round2[1].playerId)} />) : (<></>)}   </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[2].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound3(round2[2].player, round2[2].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[3].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[3].player, round2[3].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[4].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound3(round2[4].player, round2[4].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[5].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[5].player, round2[5].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[6].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound3(round2[6].player, round2[6].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[7].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[7].player, round2[7].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[8].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound3(round2[8].player, round2[8].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[9].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[9].player, round2[9].playerId)} />) : (<></>)}   </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[10].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound3(round2[10].player, round2[10].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[11].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[11].player, round2[11].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[12].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound3(round2[12].player, round2[12].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[13].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[13].player, round2[13].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[14].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound3(round2[14].player, round2[14].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[15].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[15].player, round2[15].playerId)} />) : (<></>)}  </li>
                                </ul>
                                <ul className="bracket bracket-3">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round3[0].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound4(round3[0].player, round3[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round3[1].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound4(round3[1].player, round3[1].playerId)} />) : (<></>)}   </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round3[2].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound4(round3[2].player, round3[2].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round3[3].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound4(round3[3].player, round3[3].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round3[4].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound4(round3[4].player, round3[4].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round3[5].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound4(round3[5].player, round3[5].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round3[6].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound4(round3[6].player, round3[6].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round3[7].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound4(round3[7].player, round3[7].playerId)} />) : (<></>)}  </li>
                                </ul>
                                <ul className="bracket bracket-3">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round4[0].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound5(round4[0].player, round4[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round4[1].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound5(round4[1].player, round4[1].playerId)} />) : (<></>)}   </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round4[2].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound5(round4[2].player, round4[2].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round4[3].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound5(round4[3].player, round4[3].playerId)} />) : (<></>)}  </li>
                                </ul>
                                <ul className="bracket bracket-4">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round5[0].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.winner(round5[0].player, round5[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round5[1].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.winner(round5[1].player, round5[1].playerId)} />) : (<></>)}   </li>
                                </ul>
                                <ul className="bracket bracket-5">
                                    <img className="winner" src={winner} alt="winner" />
                                    <li className="team-item"> <input type="text" className={this.state.isDisabled ? "tour-input" : "tour-input-edit"} value={this.state.winner} disabled={this.state.isDisabled} /></li>
                                </ul>
                            </div>
                        ) : this.state.rounds.length === 4 ? (
                            <div className="tournament-brackets">
                                <ul className="bracket bracket-1">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[0].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound2(round1[0].player, round1[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[1].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[1].player, round1[1].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[2].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound2(round1[2].player, round1[2].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[3].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[3].player, round1[3].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[4].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[4].player, round1[4].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[5].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[5].player, round1[5].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[6].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[6].player, round1[6].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[7].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[7].player, round1[7].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[8].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[8].player, round1[8].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[9].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[9].player, round1[9].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[10].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[10].player, round1[10].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[11].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[11].player, round1[11].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[12].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[12].player, round1[12].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[13].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[13].player, round1[13].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[14].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[14].player, round1[14].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[15].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[15].player, round1[15].playerId)} />) : (<></>)}  </li>
                                </ul>
                                <ul className="bracket bracket-2">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[0].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound3(round2[0].player, round2[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[1].player} disabled={this.state.isDisabled} />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[1].player, round2[1].playerId)} />) : (<></>)}   </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[2].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound3(round2[2].player, round2[2].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[3].player} disabled={this.state.isDisabled} />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[3].player, round2[3].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[4].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound3(round2[4].player, round2[4].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[5].player} disabled={this.state.isDisabled} />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[5].player, round2[5].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[6].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound3(round2[6].player, round2[6].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[7].player} disabled={this.state.isDisabled} />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[7].player, round2[7].playerId)} />) : (<></>)}  </li>
                                </ul>
                                <ul className="bracket bracket-3">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round3[0].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound4(round3[0].player, round3[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round3[1].player} disabled={this.state.isDisabled} />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound4(round3[1].player, round3[1].playerId)} />) : (<></>)} </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round3[2].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound4(round3[2].player, round3[2].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round3[3].player} disabled={this.state.isDisabled} />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound4(round3[3].player, round3[3].playerId)} />) : (<></>)}  </li>
                                </ul>
                                <ul className="bracket bracket-4">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round4[0].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.winner(round4[0].player, round4[0].playerId)} />) : (<></>)} <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round4[1].player} disabled={this.state.isDisabled} />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" type="button" value="won" onClick={() => this.winner(round4[1].player, round4[1].playerId)} />) : (<></>)}  </li>
                                </ul>
                                <ul className="bracket bracket-5">
                                    <img className="winner" src={winner} alt="winner" />
                                    <li className="team-item"> <input type="text" className="tour-input" value={this.state.winner} disabled /></li>
                                </ul>
                            </div>
                        ) : this.state.rounds.length === 3 ? (
                            <div className="tournament-brackets">
                                <ul className="bracket bracket-1">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[0].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound2(round1[0].player, round1[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[1].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[1].player, round1[1].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[2].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound2(round1[2].player, round1[2].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[3].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[3].player, round1[3].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[4].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[4].player, round1[4].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[5].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[5].player, round1[5].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[6].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound2(round1[6].player, round1[6].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[7].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[7].player, round1[7].playerId)} />) : (<></>)}  </li>
                                </ul>
                                <ul className="bracket bracket-2">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[0].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound3(round2[0].player, round2[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[1].player} disabled={this.state.isDisabled} />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[1].player, round2[1].playerId)} />) : (<></>)}   </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[2].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound3(round2[2].player, round2[2].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[3].player} disabled={this.state.isDisabled} />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[3].player, round2[3].playerId)} />) : (<></>)}  </li>
                                </ul>
                                <ul className="bracket bracket-4">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round3[0].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy" onClick={() => this.passToRound4(round3[0].player, round3[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round3[1].player} disabled={this.state.isDisabled} />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound4(round3[1].player, round3[1].playerId)} />) : (<></>)} </li>
                                </ul>
                                <ul className="bracket bracket-5">
                                    <img className="winner" src={winner} alt="winner" />
                                    <li className="team-item"> <input type="text" className="tour-input" value={this.state.winner} disabled /></li>
                                </ul>
                            </div>
                        ) : this.state.rounds.length === 2 ? (
                            <div className="tournament-brackets">
                                <ul className="bracket bracket-1">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[0].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound2(round1[0].player, round1[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[1].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[1].player, round1[1].playerId)} />) : (<></>)}  </li>
                                    <li className="team-item"> <input type="text" className="tour-input" value={round1[2].player} disabled /> {this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound2(round1[2].player, round1[2].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round1[3].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound2(round1[3].player, round1[3].playerId)} />) : (<></>)}  </li>
                                </ul>
                                <ul className="bracket bracket-4">
                                    <li className="team-item"> <input type="text" className="tour-input" value={round2[0].player} disabled />{this.state.isOwner ? (<FaGreaterThan className="fa-trophy" onClick={() => this.passToRound3(round2[0].player, round2[0].playerId)} />) : (<></>)}  <input type="text" className={this.state.isDisabled ? "time-input " : "time-input-edit "} value="14:00" disabled={this.state.isDisabled} /> {this.state.isOwner ? (this.state.isDisabled ? (<FaPen className="fa-trophy" onClick={this.onTapEdit} />) : (<FaSave className="fa-trophy" onClick={this.onTapEdit} />)) : (<></>)}  <input type="text" className="tour-input" value={round2[1].player} disabled={this.state.isDisabled} />{this.state.isOwner ? (<FaGreaterThan className="fa fa-trophy win" onClick={() => this.passToRound3(round2[1].player, round2[1].playerId)} />) : (<></>)}   </li>
                                </ul>
                                <ul className="bracket bracket-5">
                                    <img className="winner" src={winner} alt="winner" />
                                    <li className="team-item"> <input type="text" className="tour-input" value={this.state.winner} disabled /></li>
                                </ul>
                            </div>
                        ) : (<div></div>)}
                    </div>
                    {
                        this.state.loading === true && <Spinner />
                    }
                </Layout >
            )

        );
    }

}

export default Tourbracket;
