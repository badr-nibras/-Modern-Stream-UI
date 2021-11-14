import './Reset.scss';
import React, { useState } from "react";
import axios from "axios";
import Spinner from "../Utils/Spinner/Spinner"

const ChangePassword = () => {
    const email = localStorage.getItem("email-resetpassword")
    const [password, setPass] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [err, setError] = useState();
    const [loading, setLoading] = useState(false);


    const onSubmit = e => {
        e.preventDefault()
        setLoading(true);
        const changePass = {
            email,
            password,
            confirmPass
        }
        axios.post(process.env.REACT_APP_API_ENDPOINT + "/api/user/changePassword", changePass)
            .then(res => {
                setError(res.data)
                setLoading(false);
            })
    }

    return (
        <div>
            <div>

                <div className="signup_container">
                    <form action="POST" className="grid" onSubmit={onSubmit}>

                        <div className="form-group">
                            <label htmlFor="password">Please enter new password   <span>*</span></label>
                            <input type="password" name="password" placeholder="Password" onChange={e => setPass(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-pass">Confirm password   <span>*</span></label>
                            <input type="password" name="confirm password" placeholder="Confirm password" onChange={e => setConfirmPass(e.target.value)} />
                        </div>

                        <input type="submit" className="button button--small" value="Change password " />
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

                {
                    loading === true && <Spinner />
                }

            </div>

        </div>

    );
}

export default ChangePassword;