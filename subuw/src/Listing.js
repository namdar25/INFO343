import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledCarousel } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from './Carousel';

export class Listing extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
        };

    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    getLatLong() {
        let baseURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        let apiKey = "AIzaSyDOMxiv80oiceTHg7NerU2705RKh13ryY8";
        let address = this.props.test.address.split(' ');
        let newAdd = ""
        address.map((x) => {
            if (x.includes(".")) {
                x = x.slice(0, -1);
            }
            newAdd += x + "+"
        })
        newAdd = newAdd.slice(0, -1) + ',';
        let city = this.props.test.city.replace(' ', '+');
        if (city.includes('+')) {
            city = city.slice(0, -1) + ',';
        } else {
            city += ','
        }
        let state = this.props.test.state;
        let zip = this.props.test.zip;
        let url = baseURL + newAdd + '+' + city + '+' + state + '&key=' + apiKey;
        let coordinates = {};
        fetch(url).then(function (response) {
            return response.json()
        }).then((result) => {
            coordinates.lat = result.results[0].geometry.location.lat;
            coordinates.lng = result.results[0].geometry.location.lng;
        })
    }

    render() {
        this.getLatLong();
        return (
            <div>
                <div className="card card-inverse" onClick={this.toggle}>
                    <img className="card-img" src={this.props.test.images.one} alt="Listing Cover" />
                    <div className="card-img-overlay" id='listing-card'>
                        <h4 className="card-title">{"$" + this.props.test.rent + '/mo'}</h4>
                        <p className="card-text">{this.props.test.bedrooms + "bd . " + this.props.test.bathrooms + "ba . " + this.props.test.sqft + "sqft"} <br />
                            {this.props.test.address + ', ' + this.props.test.city + ', ' + this.props.test.state}
                        </p>
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false} >
                    <ModalBody>
                        <div>
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                    <Carousel images={this.props.test.images} />
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                            <h2>{this.props.test.address + ', ' + this.props.test.city + ', ' + this.props.test.state + ' ' + this.props.test.zip}</h2>
                            <h3>{this.props.test.bedrooms + "bd . " + this.props.test.bathrooms + "ba . " + this.props.test.sqft + "sqft"}</h3>
                            <h5>{"Availability: " + this.props.test.startDate + " to " + this.props.test.endDate}</h5>
                            <p>{this.props.test.description}</p>
                            <h5>Information:</h5>
                            <ul>
                                <li>{"Laundry: " + this.props.test.laundry}</li>
                                <li>{"Parking: " + this.props.test.parking}</li>
                                <li>{"Pets: " + this.props.test.pets}</li>
                                <li>{"Smoking: " + this.props.test.smoking}</li>
                                <li>{"Handicap Accessibility: " + this.props.test.handicap}</li>
                            </ul>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Listing;