import Layout from '../../Layouts/Layout'
import { Component } from 'react'
import './Events.scss'
import axios from 'axios'
import Swal from 'sweetalert2'
import Spinner from '../Utils/Spinner/Spinner'

class Events extends Component {
    state = {
        id: localStorage.getItem("userId"),
        events: [],
        image: {
            preview: null,
            raw: null,
        },
        message: "",
        loading: false
    }

    onImageUpload = (e) => {
        e.preventDefault();
        window.document.getElementById('input-upload').click();
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

    toggleSpinner = () => {
        this.setState({
            loading: !this.state.loading
        })
    }

    submit = () => {
        var fd = new FormData()
        if(this.state.image.raw == null) {
            this.setState({
                message: "Select an image."
            })
        } else {
            this.toggleSpinner();
            fd.append('files', this.state.image.raw, this.state.image.raw.name)
            fd.append('creator', this.state.id)
            axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/events/create', fd)
                .then((res) => {
                    this.toggleSpinner();
                    if(res.data.message) {
                        this.setState({
                            message: res.data.message
                        })
                    } else {
                        Swal.fire({
                            title: 'Success !',
                            text: res.data,
                            icon: 'success',
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                }).catch((e) => {
                    console.log(e)
                })
        }
    }

    componentDidMount() {
        const creator = {
            creator : this.state.id
        }
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/events/', creator)
            .then(res => {
                this.setState({
                    events: res.data
                })
            })
    }

    delete = (id) => {
        this.toggleSpinner();
        const creator = {
            creator : this.state.id
        }
        axios.post(process.env.REACT_APP_API_ENDPOINT + `/api/events/delete/${id}`, creator)
            .then(res => {
                this.toggleSpinner();
                if(res.data.message) {
                    this.setState({
                        message: res.data.message
                    })
                } else {
                    Swal.fire({
                        title: 'Success !',
                        text: res.data,
                        icon: 'success',
                    }).then(() => {
                        window.location.reload();
                    });
                }
            })

    }

    render() {
        return (
            <Layout>
                <div className="events_section padding">
                    <div className="header_section">
                        <h2>Event Form</h2>
                        <p>Upload the event banner and submit.</p>
                    </div>
                    <div className="event_form">
                        <div className="upload">
                            <input type="file" accept="image/*" id="input-upload" onChange={this.onImageChange} hidden />
                            <input type="button" className="button button--small button--white" value="Choose event image" onClick={this.onImageUpload} />
                            {
                                this.state.image.raw &&
                                <p>{this.state.image.raw.name}</p>
                            }
                        </div>
                        <input type="button" className="button button--small" value="Submit" onClick={this.submit} />
                    </div>
                    <br />
                    {
                        this.state.message && <p className="alert alert-danger">{this.state.message}</p>
                    }
                    <hr />
                    <div className="event_image">
                        {
                            this.state.image.preview &&
                            <img src={this.state.image.preview} alt="Upload miniature" />
                        }
                    </div>
                    <div className="header_section">
                        <h2>Active Events</h2>
                        <p>All listed events in Modern Streams.</p>
                    </div>
                    <div className="events_content grid">
                        {this.state.events.map((event, i) => {
                            return (
                                <div className="event" key={i}>
                                    <img src={event.miniature} alt="Event" />
                                    <div className="actions">
                                        <input type="button" className="button button--small" value="Delete" onClick={() => this.delete(event._id)} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {
                    this.state.loading && <Spinner />
                }
            </Layout>
        );
    }
}

export default Events;