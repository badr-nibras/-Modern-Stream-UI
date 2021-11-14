import './SideMenu.scss';
import {
    AiOutlineVideoCameraAdd,
    AiOutlineApartment,
    AiOutlineAppstoreAdd
} from 'react-icons/ai';
import {
    MdLiveTv,
    MdGames,
    MdEventNote,
    MdMenu,
    MdChevronLeft
} from 'react-icons/md';
import {
    ImProfile,
} from 'react-icons/im';
import {
    FaHome,
    FaUsers
    
} from 'react-icons/fa';
import {
    NavLink 
} from 'react-router-dom'
import { useEffect, useState } from 'react';

const SideMenu = () => {

    const backToProfile = () => {
        localStorage.setItem("visitedChannelId", "");
        window.location.href = '/profile';
    }
    
    const [isAdmin, setAdmin] = useState(false);
    const [Toggle, setToggle] = useState(false);
    console.log(Toggle);

 

    useEffect(() => {
        setAdmin(true);
    }, []);

    return (
        <div className={!Toggle ? "sidemenu" : " sidemenu sidemenuhover"} >
            <br/>
            <a className="toggle_support" onClick={() => setToggle(!Toggle)} >   { !Toggle ? <MdMenu className="Toggle-icon"  /> : <MdChevronLeft className="Toggle-icon"  />  }</a>
           
            <NavLink to="/home" activeClassName="active_link" className="link">
                <FaHome className="menu-icon" /><span>Home</span>
            </NavLink>
            <NavLink to="/stream" activeClassName="active_link" className="link">
                <AiOutlineVideoCameraAdd className="menu-icon" /><span>Start Streaming</span>
            </NavLink>
            <NavLink to="/streams" activeClassName="active_link" className="link">
                <MdLiveTv className="menu-icon" /><span>Watch Streams</span>
            </NavLink>
            <NavLink to="/tournement" activeClassName="active_link" className="link">
                <FaUsers className="menu-icon" /><span>Create Tournement</span>
            </NavLink>
            <NavLink to="/tournements" activeClassName="active_link" className="link">
                <AiOutlineApartment className="menu-icon" /><span>Tournaments</span>
            </NavLink>
            <NavLink to="/games" activeClassName="active_link" className="link">
                <MdGames className="menu-icon" /><span>Games</span>
            </NavLink>
            <NavLink onClick={backToProfile} to="/profile" activeClassName="active_link" className="link">
                <ImProfile className="menu-icon" /><span>Profile</span>
            </NavLink>
            {
                isAdmin && (
                    <>
                        <NavLink to="/game/create" activeClassName="active_link" className="link">
                            <AiOutlineAppstoreAdd className="menu-icon" /><span>Create Game</span>
                        </NavLink>
                        <NavLink to="/events" activeClassName="active_link" className="link">
                            <MdEventNote className="menu-icon" /><span>Events</span>
                        </NavLink>
                    </>
                )
            }
        </div>
    );
}
 
export default SideMenu;