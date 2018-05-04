import React, { Component } from "react";
import RoomContainer from "./RoomContainer";

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.generateBooking = this.generateBooking.bind(this);
        this.createRooms = this.createRooms.bind(this);
    }
    generateBooking(roomId, hotelId){
        this.props.generateBooking(roomId, hotelId);
    }
    createRooms(room) {
        return <RoomContainer key={room.id} room={room} hotel={this.props.hotel} generateBooking={this.generateBooking}/>
    }
    render() {
        var roomEntries = this.props.rooms,
            listRooms = (roomEntries) ? roomEntries.map(this.createRooms) : <p>There are no rooms available.</p>;

        return (
            <div className="roomList">
                <h2>Rooms</h2>
                {listRooms}
            </div>
        );
    }
}

export default RoomList;