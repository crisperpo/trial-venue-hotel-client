import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

class HotelContainer extends Component {
    constructor(props) {
        super(props);
        this.getOptionsLabels = this.getOptionsLabels.bind(this);
    }
    getOptionsLabels(allOptions, selectedOptions) {
        return this.props.getOptionsLabels(allOptions, selectedOptions);
    }
    render(){
        var h = this.props.hotel,
            amenities = this.props.amenities;

        return(
            <div className="hotelDetailContainer flex-grid">
                <div className="imageContainer col">
                    <Carousel>
                        <div>
                            <img src={"/img/" + h.images[0]} className="imgResponsive" alt={h.name} />
                        </div>
                        <div>
                            <img src={"/img/" + h.images[1]} className="imgResponsive" alt={h.name} />
                        </div>
                        <div>
                            <img src={"/img/" + h.images[2]} className="imgResponsive" alt={h.name} />
                        </div>
                    </Carousel>
                </div>
                <div className="featuresContainer col">
                    <h1>{h.name}</h1>
                    <h1 className="price">{(h.price_category === "low") ? "$" : ((h.price_category === "medium") ? "$$$" : "$$$$$")}</h1>
                    <p>{h.description}</p>
                    <h3>Distance to venue: <span>{h.distance_to_venue}</span></h3>
                    <h3>Amenities: <span>{this.getOptionsLabels(amenities, h.amenities)}</span></h3>
                    <div className="rating">{h.rating}</div>
                </div>
            </div>
        );
    }
};
export default HotelContainer;