import React, { Component } from "react";
import HotelList from "./HotelList";
import HotelForm from "./HotelForm";
import axios from "axios/index";

class Admin extends Component {
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
        this.addHotel = this.addHotel.bind(this);
        this.deleteHotel = this.deleteHotel.bind(this);
    }

    addHotel(e, newHotel) {
        if (newHotel) {
            axios.post("http://localhost:3000/hotels/", newHotel ).then(res => {
                this.setState((prevState) => {
                    return {
                        hotels: prevState.hotels.concat(newHotel)
                    };
                });
            });
        }
        e.preventDefault();
    }
    deleteHotel(id) {
        var updatedHotels = this.state.hotels.filter(function (hotel) {
            return hotel.id !== id;
        });

        axios.delete("http://localhost:3000/hotels/" + id).then(res => {
            this.setState({
                hotels: updatedHotels
            });
        });
    }
    render() {
        return (
            <div className="adminView">
                <h2>Add Hotel</h2>
                <HotelForm addHotel={this.addHotel} amenities={this.state.amenities} priceCategories={this.state.priceCategories}/>
                <h2>View Hotels</h2>
                <HotelList admin={true} hotels={this.state.hotels} deleteHotel={this.deleteHotel} amenities={this.state.amenities} priceCategories={this.state.priceCategories}/>
            </div>
        );
    }
}

export default Admin;