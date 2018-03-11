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

    render() {
        return (
            <div>
                <div className="card card-inverse" onClick={this.toggle}>
                    <img className="card-img" src={this.props.listings.imgs} alt="Listing Cover" />
                    <div className="card-img-overlay" id='listing-card'>
                        <h4 className="card-title">{"$" + this.props.listings.rent + '/mo'}</h4>
                        <p className="card-text">{this.props.listings.bedrooms + "bd . " + this.props.listings.bathrooms + "ba . " + this.props.listings.sqrft + "sqft"} <br />
                            {this.props.listings.address + ', ' + this.props.listings.city + ', ' + this.props.listings.state}
                        </p>
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false} >
                    <ModalBody>
                        <div>
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                    <Carousel images={this.props.listings.imgs} />
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
                            <h2>{this.props.listings.address + ', ' + this.props.listings.city + ', ' + this.props.listings.state + ' ' + this.props.listings.zip}</h2>
                            <h3>{this.props.listings.bedrooms + "bd . " + this.props.listings.bathrooms + "ba . " + this.props.listings.sqrft + "sqft"}</h3>
                            <h5>{"Availability: " + this.props.listings.startDate + " to " + this.props.listings.endDate}</h5>
                            <p>{this.props.listings.description}</p>
                            <h5>Information:</h5>
                            <ul>
                                <li>{"Laundry: " + this.props.listings.laundry}</li>
                                <li>{"Parking: " + this.props.listings.parking}</li>
                                <li>{"Pets: " + this.props.listings.pets}</li>
                                <li>{"Smoking: " + this.props.listings.smoking}</li>
                                <li>{"Handicap Accessibility: " + this.props.listings.handicap}</li>
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