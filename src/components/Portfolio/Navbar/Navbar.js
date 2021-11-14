import "./Navbar.scss";
import React, { Component } from "react";

import {
  FaHome,
  FaHotjar,
  FaCalendarCheck,
  FaInfoCircle,

} from 'react-icons/fa';
import {
  GiGamepadCross
} from 'react-icons/gi';








class NavBar extends Component {



  listener = null;
  state = {
    nav: false
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.pageYOffset > 640) {
      if (!this.state.nav) {
        this.setState({ nav: true });
      }
    } else {
      if (this.state.nav) {
        this.setState({ nav: false });
      }
    }

  }




  render() {
    return (
      <div className="Main-nav">
        <div className="NavBar  ">
          <nav id="animnav" className={`naav ${this.state.nav && 'Nav__black'}`}  >


            <div className="" id="horizontal-lis">
              <ul className=" ">
                
            
                <li className="">
                  <a onClick={() => {
                    const anchor = document.querySelector('#home')
                    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }} className="link">
                    <FaHome className="ico " /> <a className="block">Home</a>
                  </a>
                </li>
                
                <li className="">
                  <a onClick={() => {
                    const anchor = document.querySelector('#hotStreams')
                    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }} className="link">
                    <FaHotjar className="ico " /> <a className="block"> Hot Streams</a>
                  </a>
                </li>
                <li className="">
                  <a onClick={() => {
                    const anchor = document.querySelector('#events')
                    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }} className="link">
                    <FaCalendarCheck className="ico " /> <a className="block"> Events</a>
                  </a>
                </li>
                <li className="">
                  <a onClick={() => {
                    const anchor = document.querySelector('#games')
                    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }} className="link">
                    <GiGamepadCross className="ico " /><a className="block"> Games</a>
                  </a>
                </li>
                <li className="">
                  <a onClick={() => {
                    const anchor = document.querySelector('#about')
                    anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }} className="link">
                    <FaInfoCircle className="ico " /> <a className="block"> About</a>
                  </a>
                </li>
              </ul>
            </div>
          </nav >
        </div>
      </div>
    );
  }
}

export default NavBar;