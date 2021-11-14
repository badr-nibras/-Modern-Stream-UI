import './ProfileDrop.scss';
import Avatar from '../../Avatar/Avatar';
import { useState, useEffect } from 'react';
import axios from 'axios'


const ProfileDrop = () => {
    const [isOpen, toggleMenu] = useState(false);
    const [user, setUser] = useState([]);

    var id = localStorage.getItem("userId")


    useEffect(()=>{
        axios.get(process.env.REACT_APP_API_ENDPOINT + `/api/user/${id}`)
                .then(res => {
                    setUser(res.data[0])
                })
    })
    const LogOut = () =>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        window.location.href = process.env.REACT_APP_UI

    }

    const backToProfile = () => {
        localStorage.setItem("visitedChannelId", "");
        window.location.href = process.env.REACT_APP_UI + 'profile';
    }
    return (
        <div className="dropdown" onClick={() => {
            toggleMenu(!isOpen);
        }}>
            <Avatar img={{ src: user.photoUrl, size: "", border: true }} />
            <ul className={`dropdown-menu ${isOpen && "show"}`}>
                <li onClick={backToProfile} ><p className="dropdown-item" >My Profile</p></li>
                <li><a className="dropdown-item" href="/#">Settings</a></li>
                <hr/>
                <li onClick={LogOut}><p className="dropdown-item" >Log Out</p></li>
            </ul>
        </div>
    );
}
 
export default ProfileDrop;