import React, { Component } from "react";
import FaPrint from "react-icons/lib/fa/print";


class Confirmation extends Component {
    constructor(props) {
        super(props);

        var hotel = null,
            room = null,
            bookingRoomId = localStorage.getItem('bookingRoomId'),
            bookingHotelId = localStorage.getItem('bookingHotelId');

        if (bookingHotelId && bookingRoomId) {
            hotel = props.hotels.find(function (h) {
                return h.id === bookingHotelId;
            });
            if (hotel) {
                room = hotel.rooms.find(function (r) {
                    return r.id === bookingRoomId;
                });
            }
        }
        this.state = {
            hotel: hotel,
            room: room
        };
        this.getOptionsLabels = this.getOptionsLabels.bind(this);
    }
    printBooking() {
        window.print();
    }
    getOptionsLabels(allOptions, selectedOptions) {
        return this.props.getOptionsLabels(allOptions, selectedOptions);
    }
    render() {
        var p = this.props,
            room = this.state.room,
            hotel = this.state.hotel;
        if (this.state.hotel) {
            return (
                <div  className="confirmationView">
                    <div className="confirmationWrap">
                        <h2 className="confirmationTitle">Thank you <strong>{p.userName} {p.userSurname}</strong>!</h2>
                        <p>Your booking in <strong>{hotel.name}</strong> has been confirmed</p>
                        <h2 className="confirmationTitle">Booking code:</h2>
                        <h2 className="confirmationTitle"><span>{localStorage.getItem('bookingRef')}</span></h2>
                        <div className="infoWrap flex-grid">
                            <div className="hotelInfo col">
                                <h2>Your Hotel</h2>
                                <p>{hotel.description}</p>
                                <h3>Rating: <span>{hotel.rating}</span></h3>
                                <h3>Distance to venue: <span>{hotel.distance_to_venue}</span></h3>
                                <h3>Amenities: <span>{this.getOptionsLabels(p.amenities, hotel.amenities)}</span></h3>
                            </div>
                            <div className="roomInfo col">
                                <h2>Your Room</h2>
                                <h3>Name: <span>{room.name}</span></h3>
                                <p>{room.description}</p>
                                <h3>Max occupancy: <span>{room.max_occupancy}</span></h3>
                                <h3>Total price: <strong>${room.price_in_usd}</strong></h3>
                            </div>
                        </div>
                    </div>
                    <div className="actionsWrap">
                        <button className="btn-sm btnPrint" title="Print" onClick={this.printBooking}>
                            <FaPrint />
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div><p>No booking has been made.</p></div>
            );
        }
    }
}

export default Confirmation;