import './SocialAuth.scss';
import axios from "axios";
import React from "react";
//import { GoogleLogin } from 'react-google-login';
//import FacebookLogin from 'react-facebook-login';
import {
    FaFacebook, FaGoogle
} from 'react-icons/fa';
//import { useHistory } from "react-router-dom";


// const clientId = "459875133220-6b57t8jq619cnaab7v99f4ru16308u7m.apps.googleusercontent.com";
// const appId = "156000919893394";

const SocialAuth = () => {
    /*const history = useHistory();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [err, setError] = useState();*/

    const fetchAuthUser = async () => {
        const response = await axios
            .get(process.env.REACT_APP_API_ENDPOINT + "/api/authentication/user", { withCredentials: true })
            .catch((err) => {
                console.log("Not properly authenticated");
            });

        if (response && response.data.accessToken) {
            console.log("User: ", response.data.accessToken);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("visitedChannelId", "");
            localStorage.setItem("toSearchFor", "Search...");
            window.location.href = process.env.REACT_APP_UI + 'home'
        }
    };

    const socialLogin = async (platform) => {
        let timer = null
        const googleLoginURL =  process.env.REACT_APP_API_ENDPOINT + `/api/authentication/${platform}/start`
        const newWindow = window.open(
            googleLoginURL,
            "_blank",
            "width=auto,height=auto"
        );

        if (newWindow) {
            timer = setInterval(() => {
                if (newWindow.closed) {
                    console.log("Authenticated")
                    fetchAuthUser();
                    if (timer) clearInterval(timer)
                }
            }, 500);
        }
    }

    /*const onLoginSuccess = async (res) => {
        console.log('Login Success:', res.profileObj);
        await setUsername(res.profileObj.name)
        await setEmail(res.profileObj.email)
        await setPassword(res.profileObj.googleId)
        await setPhoneNumber("0669720245")
        const signedUp = {
            username,
            email,
            phoneNumber,
            password
        }
        axios.post('/api/authentication/local/signup', signedUp)
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    localStorage.setItem("userId", response.data.userId);
                    window.location.href = process.env.REACT_APP_UI + '/home';
                } else {
                    setError(response.data)
                }
            })
    };*/

    /*const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const responseFacebook = (response) => {
        console.log(response);

    }*/

    return (
        <div className="social-media grid">

            <div
                onClick={() => socialLogin('google')}
                className="social-auth google"
            >
                <FaGoogle />
                Google
            </div>
            <div
                onClick={() => socialLogin('facebook')}
                className="social-auth facebook"
            >
                <FaFacebook />
                Facebook
            </div>
        </div>
    );
}

export default SocialAuth;