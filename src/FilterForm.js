import React, { Component } from "react";

class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        var field = e.target.id,
            value = e.target.value,
            multiple = e.target.multiple;

        if (multiple) {
            value = this.getMultipleValues(e.target);
        }
        this.props.filterHotels(field, value);
    }
    getMultipleValues(el) {
        var value = [],
            selectedOptions = el.selectedOptions;

        for (var i = 0, l = selectedOptions.length; i < l; i++) {
            value.push(selectedOptions[i].value);
        }
        return value;
    }
    createSelectOptions(option) {
        return <option key={option[0]} value={option[0]}>{option[1]}</option>
    }
    render(){
        var optionsAmenities = Object.entries(this.props.amenities).map(this.createSelectOptions),
            optionsPriceCategories = Object.entries(this.props.priceCategories).map(this.createSelectOptions);

        return(
            <form onSubmit={this.addHotel} className="addHotelForm" ref={(r) => this._filterHotelForm = r}>
                <div className="fieldsContainer">
                    <div className="fieldWrap">
                        <label className="inputLabel">
                            Distance to venue
                        </label>
                        <input type="number" step="0.01" className="formControl" id="distance_to_venue" onChange={this.handleChange} onBlur={this.handleChange} placeholder="Distance to venue..." />
                    </div>
                    <div className="fieldWrap">
                        <label className="inputLabel">
                            Rating (0 - 5)
                        </label>
                        <input type="range" min="0" max="5" step="0.1" className="formControl" id="rating" onChange={this.handleChange} onBlur={this.handleChange} placeholder="Rating..." />
                    </div>
                    <div className="fieldWrap">
                        <label className="inputLabel">
                            Price category
                        </label>
                        <select defaultValue="" className="formControl" id="price_category" onChange={this.handleChange} onBlur={this.handleChange}>
                            <option value="">Select the price...</option>
                            {optionsPriceCategories}
                        </select>
                    </div>
                    <div className="fieldWrap">
                        <label className="inputLabel">
                            Amenities
                        </label>
                        <select multiple className="formControl" id="amenities" onChange={this.handleChange} onBlur={this.handleChange}>
                            {optionsAmenities}
                        </select>
                    </div>
                </div>
            </form>
        );
    }
};
export default FilterForm;