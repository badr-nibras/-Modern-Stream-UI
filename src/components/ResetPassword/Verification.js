import './Reset.scss';
import React, { useState } from "react";
import Spinner from "../Utils/Spinner/Spinner"
import ChangePassword from "./ChangePassword"

const Verification = () => {

    const code = localStorage.getItem("code-resetpassword");
    const [codeVerif, setCodeverif] = useState()
    const [err, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [VerifCode, setVerifCode] = useState(false)


    const onSubmit = e => {
        e.preventDefault()
        setLoading(true);
        console.log(code)
        console.log(codeVerif)
        if (code === codeVerif) {
            setVerifCode(true)
        }else {
            setError("False code")
        }
        setLoading(false)
    }

    /*const Results = () => (
        <div id="results" className="search-results">
            Some Results
        </div>
    )*/


    return (
        <div>
            <div>
                {VerifCode && <ChangePassword />}
            </div>
            <div>
                {!VerifCode ? <div className="signup_container container grid">
                    <form action="POST" className="grid" onSubmit={onSubmit}>

                        <div className="form-group">
                            <label htmlFor="verification code">Please enter the Verification code   <span>*</span></label>
                            <input type="text" name="code" placeholder="code here" onChange={e => setCodeverif(e.target.value)}/>
                        </div>

                        <input type="submit" className="button button--small" value="Verify " />
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

export default Verification;