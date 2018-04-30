import React, { Component } from "react";

class HotelContainer extends Component {
    deleteHotel(id) {
        this.props.deleteHotel(id);
    }
    getOptionsLabels(allOptions, selectedOptions) {
        var amenitiesLabels = [];
        if (!Array.isArray(selectedOptions)) {
           return allOptions[selectedOptions];
        }
        for (var i = 0, l = selectedOptions.length; i < l; i++) {
            amenitiesLabels.push( allOptions[selectedOptions[i]] );
        }
        return amenitiesLabels.join(", ");
    }
    render(){
        return(
            <div className="hotelContainer flex-grid">
                <a href="#" className="btnClose" onClick={() => this.deleteHotel(this.props.hotel.id)}> </a>
                <div className="featuresContainer col">
                    <h3>Name: <span>{this.props.hotel.name}</span></h3>
                    <h3>Description: <span>{this.props.hotel.description}</span></h3>
                    <h3>Distance to venue: <span>{this.props.hotel.distance_to_venue}</span></h3>
                    <h3>Rating: <span>{this.props.hotel.rating}</span></h3>
                    <h3>Price category: <span>{this.getOptionsLabels(this.props.priceCategories, this.props.hotel.price_category)}</span></h3>
                    <h3>Amenities: <span>{this.getOptionsLabels(this.props.amenities, this.props.hotel.amenities)}</span></h3>
                </div>
                <div className="imageContainer col">
                    <img src={"img/" + this.props.hotel.images[0]} className="imgResponsive" alt={this.props.hotel.name} />
                </div>

            </div>
        );
    }
};
export default HotelContainer;