import React, { Component } from "react";
import HotelList from "./HotelList";
import HotelForm from "./HotelForm";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotels: props.hotels
        };
        this.addHotel = this.addHotel.bind(this);
        this.deleteHotel = this.deleteHotel.bind(this);
        this.getOptionsLabels = this.getOptionsLabels.bind(this);
    }
    componentWillReceiveProps(){
        this.setState({
            hotels: this.props.hotels
        });
    }
    addHotel(e, newHotel) {
        this.props.addHotel(e, newHotel);
    }
    deleteHotel(id) {
        this.props.deleteHotel(id);
    }
    getOptionsLabels(allOptions, selectedOptions) {
        return this.props.getOptionsLabels(allOptions, selectedOptions);
    }
    render() {
        var p = this.props;

        return (
            <div className="adminView">
                <h2>Add Hotel</h2>
                <HotelForm addHotel={this.addHotel} amenities={p.amenities} priceCategories={p.priceCategories}/>
                <h2>View Hotels</h2>
                <HotelList adminView={true} hotels={this.state.hotels} deleteHotel={this.deleteHotel} amenities={p.amenities} priceCategories={p.priceCategories} getOptionsLabels={this.getOptionsLabels}/>
            </div>
        );
    }
}

export default Admin;