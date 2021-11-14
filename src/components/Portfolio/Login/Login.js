import logo from '../../../assets/images/logo.png';
import './Login.scss';
import SocialAuth from '../../SocialAuth/SocialAuth';
import axios from "axios";
import React, { useState } from "react";
import Spinner from "../../Utils/Spinner/Spinner"

const Login = () => {

    const [email, setLogin] = useState();
    const [password, setPassword] = useState();
    const [err, setError] = useState();
    const [loading, setLoading] = useState(false);

    const onSubmit = e => {
        e.preventDefault()
        setLoading(true);
        const logedin = {
            email,
            password
        }
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/authentication/local/login', logedin)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    localStorage.setItem("userId", response.data.userId);
                    localStorage.setItem("visitedChannelId", "");
                    localStorage.setItem("toSearchFor", "Search...");
                    window.location.href = '/home';

                } else {
                    setError(response.data)
                }
                setLoading(false);
            })
    }

    return (
        <div >
            <div className="login_content"   id="home">
                <div className="login container grid">
                    <img src={logo} alt="Modern Stream" />
                    <h3 className="section_title">What Are you waiting for ?</h3>
                    <input type="text" placeholder="Email address" onChange={e => setLogin(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    <input type="submit" className="button button--small" value="Login" onClick={onSubmit} />
                    {
                        err && <div className="alert alert-danger">
                            {err}
                        </div>
                    }
                    <div >
                        <a className="left" href="/reset-password">
                            <span> Forgot your password ?</span>
                        </a>
                        
                        <a  className="right" href="/signup">
                            <span> Create an account</span>
                        </a>
                    </div>
                    <hr />
                    <SocialAuth />
                </div>
            </div>
            {
                loading === true && <Spinner />
            }
        </div>
    );
}

export default Login;