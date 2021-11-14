import './Reset.scss';
import React, { useState } from "react";
import axios from "axios";
import Spinner from "../Utils/Spinner/Spinner"
import Verification from "./Verification"

const Reset = () => {

    const [email, setEmail] = useState();
    const [err, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [VerifCode, setVerifCode] = useState(false)


    const onSubmit = e => {
        e.preventDefault()
        setLoading(true);
        const reset = {
            email: email
        }
        axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/user/resetPassword", reset)
            .then(res => {
                console.log(res.data.code)
                if(res.data.message) {
                    setError(res.data.message.code)
                } else {
                    localStorage.setItem("code-resetpassword", res.data.code)
                    localStorage.setItem("email-resetpassword", email)
                    setVerifCode(true)
                }
                setLoading(false)
            })
            setLoading(false)
    }

    /*const Results = () => (
        <div id="results" className="search-results">
            Some Results
        </div>
    )*/


    return (
        <div>
            <div className="signup section">
                <h2 className="section_title">Reset your password</h2>
                <p className="section_subtitle">Follow next steps to reset your password</p>
                <div>
                    {VerifCode && <Verification />}
                </div>
                {!VerifCode ? <div className="signup_container container grid">
                    <form action="POST" className="grid" onSubmit={onSubmit}>

                        <div className="form-group">
                            <label htmlFor="email">Email Address <span>*</span></label>
                            <input type="email" name="email" placeholder="janedoe@email.com" onChange={e => setEmail(e.target.value)} />
                        </div>

                        <input type="submit" className="button button--small" value="Reset passeord" />
                        <hr />
                        <a href="/">
                            <span>You remember the password ? <span>Sign in</span></span>
                        </a>
                    </form>
                    {
                        err && <div className="alert alert-danger">
                            {err}
                        </div>
                    }

                </div>
                    : null}
                {
                    loading === true && <Spinner />
                }

            </div>

        </div>

    );
}

export default Reset;