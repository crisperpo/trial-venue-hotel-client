import React, { Component } from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./Home";
import Confirmation from "./Confirmation";
import Detail from "./Detail";
import Admin from "./Admin";
import Header from "./Header";
import './assets/scsss/App.scss';
import axios from "axios/index";

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotels: [],
            priceCategories: {
                low: 'Low',
                medium: 'Medium',
                high: 'High'
            },
            amenities: {
                free_parking: 'Free parking',
                free_wifi: 'Free wifi',
                pets: 'Pets',
                restaurant: 'Restaurant',
                gym: 'Gym',
                pool: 'Pool',
                spa: 'Spa'
            }
        };
    }
    componentDidMount(){
        axios.get("http://localhost:3000/hotels").then(res => {
            var hotels = res.data;
            this.setState({
                hotels: hotels
            });
            this.forceUpdate();
        });
    }
    render() {
        var s = this.state;
        return (
            <BrowserRouter>
                <div className="app">
                    <Header />
                    <div className="content">
                        <Route exact path="/" render={() => <Home hotels={s.hotels} priceCategories={s.priceCategories} amenities={s.amenities}/>}/>
                        <Route exact path="/confirmation" render={() => <Confirmation hotels={s.hotels} priceCategories={s.priceCategories} amenities={s.amenities}/>}/>
                        <Route exact path="/hotel/:id" render={() => <Detail hotels={s.hotels} priceCategories={s.priceCategories} amenities={s.amenities}/>}/>
                        <Route exact path="/admin" render={() => <Admin hotels={s.hotels} priceCategories={s.priceCategories} amenities={s.amenities}/>}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default Main;