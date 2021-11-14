import React from 'react';
import './Tournements.scss';
import Layout from '../../Layouts/Layout'
import {
    NavLink
} from 'react-router-dom'
import axios from 'axios'


// Start App

class Tournements extends React.Component {
    constructor() {
        super();

        this.state = {
            posts: {}
        }
    }
    async componentWillMount() {
        await axios.get(process.env.REACT_APP_API_ENDPOINT + "/api/tournement")
            .then(res => {
                this.setState({
                    posts: res.data
                });
            })
        // recherche
        var newPosts = this.state.posts.filter(post => post.title.toLowerCase().indexOf(localStorage.getItem("toSearchFor") === "Search..." ? "".toLowerCase() : localStorage.getItem("toSearchFor").toLowerCase()) !== -1);
        this.setState({
            posts: newPosts
        })

    }


    render() {

        return (
            <Layout>
                <div className="tournements padding">
                    <Title />
                    <div className="tournements_container grid">
                        {
                            Object
                                .keys(this.state.posts)
                                .map(key => <Card key={key} index={key} details={this.state.posts[key]} />)
                        }
                    </div>
                </div>
            </Layout>
        )
    }
}


class Title extends React.Component {
    render() {
        return (
            <div className="header_section">
                <h2>Tours and Competiions</h2>
                <p>March to April 2022</p>
            </div>
        );
    }
}


class Button extends React.Component {
    openTournoi = (id) => {
        localStorage.setItem("tourId", id);
        window.location.href = '/tournements/tourbracket';
    }
    render() {
        return (
            <NavLink onClick={() => this.openTournoi(this.props.id)} to="/tournements/tourbracket" className="button button--smaller">
                Show Info
            </NavLink>
        );
    }
}


class CardHeader extends React.Component {
    render() {
        const image = this.props.image;
        const category = this.props.category;
        var style = {
            backgroundImage: 'url(' + image + ')',

        };
        return (
            <header style={style} className="card-header">
                <h4 className="card-header--title">{category}</h4>
            </header>
        )
    }
}


class CardBody extends React.Component {
    render() {
        return (
            <div className="card-body">
                <p className="date">March 20 2015</p>
                <h3>{this.props.title}</h3>
                <h5>{this.props.type}</h5>

                <p className="body-content">Join this tournement and win $2.5million.</p>

                <Button id={this.props.id} />
            </div>
        )
    }
}


class Card extends React.Component {
    render() {
        return (
            <article className="card">
                <CardHeader category={this.props.details.game} image={this.props.details.miniature}/>
                <CardBody title={this.props.details.title} type={this.props.details.type} id={this.props.details._id} text={this.props.details.text} />
            </article>
        )
    }
}

export default Tournements;
