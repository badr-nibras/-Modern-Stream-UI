import './SignUp.scss';
import SocialAuth from '../SocialAuth/SocialAuth';
import React, { useState } from "react";
import axios from "axios";
import Spinner from "../Utils/Spinner/Spinner"

const SignUp = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [err, setError] = useState();
    const [loading, setLoading] = useState(false);


    const onSubmit = e => {
        e.preventDefault()
        setLoading(true);
        const signedUp = {
            username,
            email,
            phoneNumber,
            password
        }
        axios.post(process.env.REACT_APP_API_ENDPOINT + '/api/authentication/local/signup', signedUp)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    localStorage.setItem("userId", response.data.userId);
                    localStorage.setItem("visitedChannelId", "");
                    localStorage.setItem("toSearchFor", "Search...");
                    window.location.href = '/home';
                }else {
                    setError(response.data);
                    console.log(response.data);
                }
                setLoading(false);
            })
    }


    return (
        <div className="signup section">
            <h2 className="section_title">Sign Up</h2>
            <p className="section_subtitle">You can create account using social media too !</p>
            <div className="signup_container container grid">
                <form action="POST" className="grid" onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username <span>*</span></label>
                        <input type="text" name="username" placeholder="my_username" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password <span>*</span></label>
                        <input type="password" name="password" placeholder="Create a password" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address <span>*</span></label>
                        <input type="email" name="email" placeholder="janedoe@email.com" onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number <span>*</span></label>
                        <input type="tele" name="phone" placeholder="+1 (555) 555-1212" onChange={e => setPhoneNumber(e.target.value)} />
                    </div>
                    <input type="submit" className="button button--small" value="Create Account" />
                    <a href="/">
                        <span>Have an account? <span>Sign in</span></span>
                    </a>
                </form>
                {
                    err && <div className="alert alert-danger">
                        {err}
                    </div>
                }
                <hr />
                <SocialAuth />
            </div>
           {
               loading === true &&  <Spinner />
           }
        </div>
    );
}

export default SignUp;