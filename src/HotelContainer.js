import React, { Component } from "react";
import {NavLink} from "react-router-dom";

class HotelContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMoreInfoVisible: false
        }
        this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
    }
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
    toggleMoreInfo() {
        this.setState({
            isMoreInfoVisible: !this.state.isMoreInfoVisible
        });
    }
    render(){
        var h = this.props.hotel,
            isAdmin = this.props.admin,
            amenities = this.props.amenities,
            priceCategories = this.props.priceCategories;

        return(
            <div className="hotelContainer flex-grid">
                {isAdmin ? <button className="btn-sm btnClose" onClick={() => this.deleteHotel(h.id)}></button> : <button className="btn-sm btnMoreInfo" onClick={this.toggleMoreInfo}></button>}
                <div className="imageContainer col">
                    <img src={"img/" + h.images[0]} className="imgResponsive" alt={h.name} />
                </div>
                <div className="featuresContainer col">
                    {this.props.admin ? (
                        <div className="featuresAdmin">
                            <h3>Name: <span>{h.name}</span></h3>
                            <h3>Description: <span>{h.description}</span></h3>
                            <h3>Distance to venue: <span>{h.distance_to_venue}</span></h3>
                            <h3>Rating: <span>{h.rating}</span></h3>
                            <h3>Price category: <span>{this.getOptionsLabels(priceCategories, h.price_category)}</span></h3>
                            <h3>Amenities: <span>{this.getOptionsLabels(amenities, h.amenities)}</span></h3>
                        </div>
                    ) : (
                        <div className="features flex-grid">
                            <div className="infoContainer col-sm">
                                <h1>{h.name}</h1>
                                <h2 className="price">{(h.price_category === "low") ? "$" : ((h.price_category === "medium") ? "$$$" : "$$$$$")}</h2>
                            </div>
                            <div className="bookingContainer col-sm">
                                <div className="rating">{h.rating}</div>
                                <NavLink exact to={"/hotels/"+h.id}>
                                    <button className="btn btnDetail">Details</button>
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>
                {this.state.isMoreInfoVisible && !this.props.admin && <div className="moreFeatures">
                    <p>{h.description}</p>
                    <h3>Distance to venue: <span>{h.distance_to_venue}</span></h3>
                    <h3>Amenities: <span>{this.getOptionsLabels(amenities, h.amenities)}</span></h3>
                </div>}
            </div>
        );
    }
};
export default HotelContainer;