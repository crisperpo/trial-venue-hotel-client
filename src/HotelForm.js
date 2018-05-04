import React, { Component } from "react";
import uuidv4 from "uuid";

class HotelForm extends Component {
    constructor(props) {
        super(props);
        this.addHotel = this.addHotel.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    addHotel(e) {
        var newHotel = null;
        if (this.isFormValid()) {
            newHotel = {
                id: uuidv4(),
                name: this._hotelName.value,
                description: this._hotelDescription.value,
                distance_to_venue: Number(this._hotelDistanceToVenue.value),
                rating: this._hotelRating.value,
                price_category: this._hotelPriceCategory.value,
                amenities: this.getMultipleValues(this._hotelAmenities),
                images: [
                    "imgHotel1_640x427.jpeg",
                    "imgHotel2_640x427.jpeg",
                    "imgHotel3_640x427.jpeg"
                ]
            };
            this.cleanForm();
        }
        this.props.addHotel(e, newHotel);
    }
    cleanForm() {
        this._addHotelForm.reset();
    }
    handleChange(e) {
        var field = e.target.id,
            value = e.target.value,
            validity = this.isFieldValid(value, field);
        e.target.className = "formControl " + ((!validity) ? 'invalid' : '');
    }
    getMultipleValues(el) {
        var value = [],
            selectedOptions = el.selectedOptions;

        for (var i = 0, l = selectedOptions.length; i < l; i++) {
            value.push(selectedOptions[i].value);
        }
        return value;
    }
    isEmpty(str) {
        return !(/\S+/.test(str)) && str !== undefined ;
    }
    isFormValid() {
        var isValid = true,
            self = this,
            fieldsToValidate = [this._hotelName, this._hotelDescription, this._hotelDistanceToVenue];

        fieldsToValidate.map(function(field){
            if (!self.isFieldValid(field)) {
                isValid = false;
            }
            return true;
        });
        return isValid;
    }
    isFieldValid(field) {
        if (this.isEmpty(field.value)) {
            return false;
        }
        return true;
    }
    createSelectOptions(option) {
        return <option key={option[0]} value={option[0]}>{option[1]}</option>
    }
    render(){
        var optionsAmenities = Object.entries(this.props.amenities).map(this.createSelectOptions),
            optionsPriceCategories = Object.entries(this.props.priceCategories).map(this.createSelectOptions);

        return(
            <form onSubmit={this.addHotel} className="hotelForm" ref={(r) => this._addHotelForm = r}>
                <div className="fieldsContainer">
                    <div className="fieldWrap">
                        <label className="inputLabel">
                            Name
                        </label>
                        <input type="text" className="formControl" id="_hotelName" ref={(r) => this._hotelName = r} onChange={this.handleChange} onBlur={this.handleChange} placeholder="Name..." />
                    </div>
                    <div className="fieldWrap">
                        <label className="inputLabel">
                            Description
                        </label>
                        <input type="text" className="formControl" id="_hotelDescription" ref={(r) => this._hotelDescription = r} onChange={this.handleChange} onBlur={this.handleChange} placeholder="Description..."/>
                    </div>
                    <div className="fieldWrap">
                        <label className="inputLabel">
                            Distance to venue
                        </label>
                        <input type="number" step="0.01" className="formControl" id="_hotelDistanceToVenue" ref={(r) => this._hotelDistanceToVenue = r} onChange={this.handleChange} onBlur={this.handleChange} placeholder="Distance to venue..." />
                    </div>
                    <div className="fieldWrap">
                        <label className="inputLabel">
                            Rating (0 - 5)
                        </label>
                        <input type="range" min="0" max="5" step="0.01" className="formControl" id="_hotelRating" ref={(r) => this._hotelRating = r} onChange={this.handleChange} onBlur={this.handleChange} placeholder="Rating..." />
                    </div>
                    <div className="fieldWrap">
                        <label className="inputLabel">
                            Price category
                        </label>
                        <select className="formControl" id="_hotelPriceCategory" ref={(r) => this._hotelPriceCategory = r} onChange={this.handleChange} onBlur={this.handleChange}>
                            {optionsPriceCategories}
                        </select>
                    </div>
                    <div className="fieldWrap">
                        <label className="inputLabel">
                            Amenities
                        </label>
                        <select multiple className="formControl" id="_hotelAmenities" ref={(r) => this._hotelAmenities = r} onChange={this.handleChange} onBlur={this.handleChange} >
                            {optionsAmenities}
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btnSubmit">Save</button>
            </form>
        );
    }
};
export default HotelForm;