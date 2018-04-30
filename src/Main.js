import React, { Component } from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./Home";
import Confirmation from "./Confirmation";
import Detail from "./Detail";
import Admin from "./Admin";
import Header from "./Header";
import './assets/scsss/App.scss';

class Main extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Header />
                    <div className="content">
                        <Route exact path="/" component={Home}/>
                        <Route path="/confirmation" component={Confirmation}/>
                        <Route path="/hotel/:id" component={Detail}/>
                        <Route path="/admin" component={Admin}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;