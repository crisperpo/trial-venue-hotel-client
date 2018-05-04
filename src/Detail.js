import React, { Component } from "react";
import HotelDetail from "./HotelDetail";
import RoomList from "./RoomList";

class Detail extends Component {
    constructor(props) {
        super(props);

        var id = this.props.match.params.id,
            hotel;

        hotel = this.props.hotels.find(function (h) {
            return h.id === id;
        });

        this.state = {
            hotel: hotel
        };
        this.generateBooking = this.generateBooking.bind(this);
        this.getOptionsLabels = this.getOptionsLabels.bind(this);
    }
    getOptionsLabels(allOptions, selectedOptions) {
        return this.props.getOptionsLabels(allOptions, selectedOptions);
    }
    generateBooking(roomId, hotelId){
        this.props.generateBooking(roomId, hotelId);
    }
    render() {
        var s = this.state;
        return (
            <div className="detailView">
                <HotelDetail hotel={s.hotel} amenities={this.props.amenities} priceCategories={this.props.priceCategories} getOptionsLabels={this.getOptionsLabels}/>
                <RoomList rooms={s.hotel.rooms} hotel={s.hotel} generateBooking={this.generateBooking}/>
            </div>
        );
    }
}

export default Detail;