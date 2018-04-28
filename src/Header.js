import React, { Component } from "react";
import {NavLink} from "react-router-dom";
import logo from './assets/img/icons/icn_trivago.png';

class Header extends Component {
    render() {
        return(
            <header id="header">
                <div className="titleWrap">
                    <NavLink exact to="/">
                        <img className="logo" src={logo} alt="Main Logo" />
                        <span className="title">Trivago Venue Hotel</span>
                    </NavLink>
                </div>
                <div className="userMenu">
                    <i>&#9786;</i>
                    <span>John Doe</span>
                    <i>&#8964; </i>
                </div>
            </header>
        );
    }
}

export default Header;