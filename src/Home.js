import React, { Component } from "react";
import HotelList from "./HotelList";
import FilterForm from "./FilterForm";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredHotels: []
        };
        this.filterHotels = this.filterHotels.bind(this);
    }
    componentWillReceiveProps(){
        this.setState({
            filteredHotels: this.props.hotels
        });
    }
    filterHotels(field, value) {
        var allHotels = this.props.hotels,
            updatedHotels = allHotels,
            matchedAmenities;

        switch (field) {
            case "distance_to_venue":
                if (value === "") {
                    updatedHotels = allHotels;
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
                    updatedHotels = allHotels;
                } else {
                    updatedHotels = updatedHotels.filter(function (hotel) {
                        return hotel.price_category === value;
                    });
                }
                break;
            case "amenities":
                if (value.length === 0) {
                    updatedHotels = allHotels;
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
        var p = this.props,
            s = this.state;

        return (
            <div className="homeView">
                <FilterForm filterHotels={this.filterHotels} amenities={p.amenities} priceCategories={p.priceCategories}/>
                <HotelList hotels={s.filteredHotels} deleteHotel={this.deleteHotel} amenities={p.amenities} priceCategories={p.priceCategories}/>
            </div>
        );
    }
}

export default Home;