import ProfileDrop from './ProfileDrop/ProfileDrop';
import Logo from '../../assets/images/logo.png'
import './Header.scss';
import {
    FaSearch, FaTimes
} from 'react-icons/fa';
import React, { useState } from "react";


const HeaderMenu = () => {

    const [search, setSearch] = useState(localStorage.getItem("toSearchFor") ?? "Search...");

    const onSearch = (e) => {
        if (e.key === 'Enter') {
            localStorage.setItem("toSearchFor", search);
            window.location.reload()
        }
    }
    const removeSearch = () => {
        localStorage.setItem("toSearchFor", "Search...");
        window.location.reload()
    }

    return (
        <>
            <div className="header">
                <div className="sidemenu_toggle">
                    <img src={Logo} className="logo" alt="Logo" />
                    <h3>Modern Stream</h3>
                </div>
                <div className="header_search">
                    <FaSearch />
                    <input type="text" placeholder={search} onChange={e => setSearch(e.target.value)} onKeyPress={onSearch} />
                    {search !== "Search..." ? (
                        <div className="remove_search" onClick={removeSearch} >
                            <FaTimes />
                        </div>
                    ) : (<div></div>)}
                </div>
                <div className="header_actions">
                    <ProfileDrop />
                </div>
            </div>
        </>
    );
}

export default HeaderMenu;