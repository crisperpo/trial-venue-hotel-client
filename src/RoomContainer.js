import React, { Component } from "react";
import {NavLink} from "react-router-dom";

class RoomContainer extends Component {
    constructor(props){
        super(props);
        this.generateBooking = this.generateBooking.bind(this);
    }
    generateBooking(e){
        this.props.generateBooking(this.props.room.id, this.props.hotel.id);
    }
    render(){
        var r = this.props.room;

        return(
            <div className="roomContainer flex-grid">
                <div className="infoContainer col">
                    <h2>{r.name}</h2>
                    <p>{r.description}</p>
                    <h3>Max occupancy: <span>{r.max_occupancy}</span></h3>
                </div>
                <div className="bookingContainer col">
                    <div className="price">
                        {"$" + r.price_in_usd}
                    </div>
                    <NavLink exact to={"/confirmation/"}>
                        <button className="btn btnBook" onClick={this.generateBooking}>Book</button>
                    </NavLink>
                </div>
            </div>
        );
    }
};

export default RoomContainer;