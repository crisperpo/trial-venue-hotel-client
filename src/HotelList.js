import React, { Component } from "react";
import HotelContainer from "./HotelContainer";

class HotelList extends Component {
    constructor(props) {
        super(props);
        this.createHotels = this.createHotels.bind(this);
        this.deleteHotel = this.deleteHotel.bind(this);
        this.getOptionsLabels = this.getOptionsLabels.bind(this);
    }
    createHotels(hotel) {
        return <HotelContainer adminView={this.props.adminView} key={hotel.id} hotel={hotel} deleteHotel={this.deleteHotel} amenities={this.props.amenities} priceCategories={this.props.priceCategories} getOptionsLabels={this.getOptionsLabels}/>
    }
    deleteHotel(id) {
        this.props.deleteHotel(id);
    }
    getOptionsLabels(allOptions, selectedOptions) {
        return this.props.getOptionsLabels(allOptions, selectedOptions);
    }
    render() {
        var hotelEntries = this.props.hotels,
            listHotels = hotelEntries.map(this.createHotels);
        return(
            <div className="hotelList">
                {listHotels}
            </div>
        );
    }
};

export default HotelList;