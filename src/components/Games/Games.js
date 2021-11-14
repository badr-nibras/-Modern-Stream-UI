import { Component } from 'react';
import Layout from '../../Layouts/Layout';
import './Games.scss';

import GameCard from './GameCard/GameCard';
import axios from 'axios'

class Games extends Component {
    state = {
        games: []
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

    render() {
        return (
            <Layout>
                <div className="games_section padding">
                    <div className="header_section">
                        <h2>Trending games</h2>
                        <p>What people are playing around the world.</p>
                    </div>
                    <div className="games grid">
                        {this.state.games.sort((a, b) => a.players < b.players).slice(0, 3).map((game, index) => {
                            return (
                                <GameCard key={index} game={game} />
                            );
                        })}
                    </div>
                    <br />
                    <hr />
                    <br />
                    <div className="header_section">
                        <h2>All games</h2>
                        <p>Find what you like here.</p>
                    </div>
                    <div className="games grid">
                        {this.state.games.map((game, index) => {
                            return (
                                <GameCard key={index} game={game} />
                            );
                        })}
                    </div>
                </div>
            </Layout>
        );
    }
}

export default Games;