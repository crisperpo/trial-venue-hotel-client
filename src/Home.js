import React, { Component } from "react";
import HotelList from "./HotelList";
import axios from "axios/index";

class Home extends Component {
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

        axios.get("http://localhost:3000/hotels").then(res => {
            var hotels = res.data;
            this.setState({ hotels });
        });
    }
    render() {
        return (
            <div className="homeView">
                <HotelList hotels={this.state.hotels} deleteHotel={this.deleteHotel} amenities={this.state.amenities} priceCategories={this.state.priceCategories}/>
            </div>
        );
    }
}

export default Home;