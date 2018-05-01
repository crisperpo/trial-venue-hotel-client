import React, { Component } from "react";
import HotelContainer from "./HotelContainer";

class HotelList extends Component {
    constructor(props) {
        super(props);
        this.createHotels = this.createHotels.bind(this);
        this.deleteHotel = this.deleteHotel.bind(this);
    }
    createHotels(hotel) {
        return <HotelContainer admin={this.props.admin} key={hotel.id} hotel={hotel} deleteHotel={this.deleteHotel} amenities={this.props.amenities} priceCategories={this.props.priceCategories}/>
    }
    deleteHotel(id) {
        this.props.deleteHotel(id);
    }
    render() {
        var hotelEntries = this.props.hotels;
        var listHotels = hotelEntries.map(this.createHotels);
        return(
            <div className="hotelList">
                {listHotels}
            </div>
        );
    }
};

export default HotelList;