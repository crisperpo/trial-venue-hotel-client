import React, { Component } from "react";
import HotelList from "./HotelList";
import FilterForm from "./FilterForm";
import axios from "axios/index";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotels: [],
            filteredHotels: [],
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
            this.setState({
                hotels: hotels,
                filteredHotels: hotels
            });
        });
        this.filterHotels = this.filterHotels.bind(this);
    }
    filterHotels(field, value) {
        var updatedHotels = this.state.hotels,
            matchedAmenities;

        switch (field) {
            case "distance_to_venue":
                if (value === "") {
                    updatedHotels = this.state.hotels;
                } else {
                    updatedHotels = updatedHotels.filter(function (hotel) {
                        return hotel.distance_to_venue <= value;
                    });
                }
                break;
            case "rating":
                updatedHotels = updatedHotels.filter(function (hotel) {
                    return hotel.rating >= value;
                });
                break;
            case "price_category":
                if (value === "") {
                    updatedHotels = this.state.hotels;
                } else {
                    updatedHotels = updatedHotels.filter(function (hotel) {
                        return hotel.price_category === value;
                    });
                }
                break;
            case "amenities":
                console.log(value);
                if (value.length === 0) {
                    updatedHotels = this.state.hotels;
                } else {
                    updatedHotels = updatedHotels.filter(function (hotel) {
                        matchedAmenities = value.filter(function(requiredAmenity){
                            return hotel.amenities.indexOf(requiredAmenity) !== -1;
                        });
                        return matchedAmenities.length === value.length;
                    });
                }
                break;
        }

        this.setState({
            filteredHotels: updatedHotels
        });
    }
    render() {
        return (
            <div className="homeView">
                <FilterForm filterHotels={this.filterHotels} amenities={this.state.amenities} priceCategories={this.state.priceCategories}/>
                <HotelList hotels={this.state.filteredHotels} deleteHotel={this.deleteHotel} amenities={this.state.amenities} priceCategories={this.state.priceCategories}/>
            </div>
        );
    }
}

export default Home;