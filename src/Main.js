import React, { Component } from "react";
import {BrowserRouter, Route} from "react-router-dom";
import uuidv4 from "uuid";
import axios from "axios/index";
import Home from "./Home";
import Confirmation from "./Confirmation";
import Detail from "./Detail";
import Admin from "./Admin";
import Header from "./Header";
import './assets/scsss/App.scss';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotels: null,
            bookingRoomId: localStorage.getItem('bookingRoomId'),
            bookingHotelId: localStorage.getItem('bookingHotelId'),
            bookingRef: localStorage.getItem('bookingRef') || "",
            priceCategories: {
                low: 'Low',
                medium: 'Medium',
                high: 'High'
            },
            amenities: {
                free_parking: 'Free parking',
                free_wifi: 'Free wifi',
                pets: 'Pets',
                restaurant: 'Restaurant',
                gym: 'Gym',
                pool: 'Pool',
                spa: 'Spa'
            },
            userName: "John",
            userSurname: "Doe"
        };
        this.addHotel = this.addHotel.bind(this);
        this.deleteHotel = this.deleteHotel.bind(this);
        this.generateBooking = this.generateBooking.bind(this);
        this.getOptionsLabels = this.getOptionsLabels.bind(this);
    }
    componentDidMount(){
        axios.get("http://localhost:3000/hotels").then(res => {
            var hotels = res.data;
            this.setState({
                hotels: hotels
            });
            this.forceUpdate();
        });
    }
    generateBooking(roomId, hotelId){
        this.setState({
            bookingRef: uuidv4(),
            bookingRoomId: roomId,
            bookingHotelId: hotelId
        });

        localStorage.setItem('bookingRef', uuidv4());
        localStorage.setItem('bookingRoomId', roomId);
        localStorage.setItem('bookingHotelId', hotelId);
    }
    addHotel(e, newHotel) {
        if (newHotel) {
            axios.post("http://localhost:3000/hotels/", newHotel ).then(res => {
                this.setState((prevState) => {
                    return {
                        hotels: prevState.hotels.concat(newHotel)
                    };
                });
                this.forceUpdate();
            });
        }
        e.preventDefault();
    }
    deleteHotel(id) {
        var updatedHotels = this.state.hotels.filter(function (hotel) {
            return hotel.id !== id;
        });

        axios.delete("http://localhost:3000/hotels/" + id).then(res => {
            this.setState({
                hotels: updatedHotels
            });
            this.forceUpdate();
        });
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
    render() {
        var s = this.state;

        if (s.hotels !== null) {
            return (
                <BrowserRouter>
                    <div className="app">
                        <Header userName={s.userName}
                                userSurname={s.userSurname} />
                        <div className="content">
                            <Route exact path="/" render={(props) => <Home {...props}
                                                                           hotels={s.hotels}
                                                                           priceCategories={s.priceCategories}
                                                                           amenities={s.amenities}
                                                                           getOptionsLabels={this.getOptionsLabels}/>}/>
                            <Route exact path="/detail/:id" render={(props) => <Detail {...props}
                                                                                       hotels={s.hotels}
                                                                                       priceCategories={s.priceCategories}
                                                                                       amenities={s.amenities}
                                                                                       generateBooking={this.generateBooking}
                                                                                       getOptionsLabels={this.getOptionsLabels}/>}/>
                            <Route exact path="/confirmation" render={(props) => <Confirmation {...props}
                                                                                               hotels={s.hotels}
                                                                                               priceCategories={s.priceCategories}
                                                                                               amenities={s.amenities}
                                                                                               bookingRoomId={s.bookingRoomId}
                                                                                               bookingHotelId={s.bookingHotelId}
                                                                                               bookingRef={s.bookingRef}
                                                                                               userName={s.userName}
                                                                                               userSurname={s.userSurname}
                                                                                               getOptionsLabels={this.getOptionsLabels}/>}/>
                            <Route exact path="/admin" render={(props) => <Admin {...props}
                                                                                 hotels={s.hotels}
                                                                                 priceCategories={s.priceCategories}
                                                                                 amenities={s.amenities}
                                                                                 deleteHotel={this.deleteHotel}
                                                                                 addHotel={this.addHotel}
                                                                                 getOptionsLabels={this.getOptionsLabels}/>}/>
                        </div>
                    </div>
                </BrowserRouter>
            );
        } else {
            return <div> </div>;
        }
    }
}

export default Main;