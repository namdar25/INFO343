
import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
Import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

export default  class EditListing extends Component {
    constructor(props) {
        super(props)
        this.editListing = this.editListing.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
            address: '',
            city: '',
            state: '',
            zip: '',
            type: 'apartment',
            rent: '',
            startDate: '',
            endDate: '',
            bedrooms: '',
            bathrooms: '',
            handicap: 'no',
            laundry: 'not available',
            description: '',
            lat: '',
            long: '',
            newListing: {}
        })
    }

	componentDidMount() {
		this.setState(
            address: this.props.listing.address,
            city: this.props.listing.city,
            state: this.props.listing.state,
            zip: this.props.listing.zip,
            type: this.props.listing.type,
            rent: this.props.listing.rent,
            startDate: this.props.listing.startDate,
            endDate: this.props.listing.endDate,
            bedrooms: this.props.listing.bedrooms,
            bathrooms: this.props.listing.bathrooms,
            handicap: this.props.listing.handicap,
            laundry: this.props.listing.laundry,
            description: this.props.listing.description,
            lat: this.props.listing.lat,
            long: this.props.listing.long
			listingID: this.props.listing.key
		)
	}

    handleChange(propertyName, event) {
        var change = {};
        change[propertyName] = event.target.value;
        this.setState(change)
    }


    editListing(event) {
        event.preventDefault();
        console.log(this.state.address)
        let address = this.state.address;
        let city = this.state.city;
        let state = this.state.state;
        let zip = this.state.zip;
        let type = this.state.type;
        let rent = this.state.rent;
        let startDate = this.state.startDate;
        let endDate = this.state.endDate;
        let bedrooms = this.state.bedrooms;
        let bathrooms = this.state.bathrooms;
        let handicap = this.state.handicap;
        let laundry = this.state.laundry;
        let description = this.state.description;
        // this.getLatLong(address, city, state, zip);
        let baseURL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        let apiKey = "AIzaSyDOMxiv80oiceTHg7NerU2705RKh13ryY8";
        let newAdd = ""
        let altAddress = address.split(' ');
        altAddress.map((x) => {
            if (x.includes(".")) {
                x = x.slice(0, -1);
            }
            newAdd += x + "+"
        })
        newAdd = newAdd.slice(0, -1) + ',';
        let altCity = city.replace(' ', '+');//test.city.replace(' ', '+');
        if (altCity.includes('+')) {
            altCity = altCity.slice(0, -1) + ',';
        } else {
            altCity += ','
        }
        let url = baseURL + newAdd + '+' + altCity + '+' + state + '&key=' + apiKey;
        console.log(url)
        let promise = fetch(url).then(function (response) {
            return response.json()
        })
        Promise.all([promise]).then((result) => {
            let lat = result[0].results[0].geometry.location.lat;
            let lng = result[0].results[0].geometry.location.lng;
            let listingsRef = firebase.database().ref('Listings/' + this.state.listingID);
            listingsRef.set({
                address: address,
                city: city,
                state: state,
                zip: zip,
                type: type,
                rent: rent,
                startDate: startDate,
                endDate: endDate,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                handicap: handicap,
                laundry: laundry,
                description: description,
                lat: lat,
                long: lng
            }
        }).catch(err => {
            this.setState({ errorMessage: err.message })
        });
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
                    <img className="card-img" src={this.props.listings.images.one} alt="Listing Cover" />
                    <div className="card-img-overlay" id='listing-card'>
                        <h4 className="card-title">{"$" + this.props.listings.rent + '/mo'}</h4>
                        <p className="card-text">{this.props.listings.beds + "bd . " + this.props.listings.baths + "ba . " + this.props.listings.sqft + "sqft"} <br />
                            {this.props.listings.address + ', ' + this.props.listings.city + ', ' + this.props.listings.state}
                        </p>
                    </div>
                </div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false} >
                    <ModalBody>
						<div className='addListing' >
							<form>
								<div className="column">
									< div className="form-group">
										<label>Address: </label>
										<input type="text" className="form-control" id="address" placeholder="Enter Address" onChange={this.handleChange.bind(this, 'address')} />
									</div>
									< div className="form-group">
										<label>City: </label>
										<input type="text" className="form-control" id="city" placeholder="Enter City" onChange={this.handleChange.bind(this, 'city')} />
									</div>
									< div className="form-group">
										<label>State: </label>
										<input type="text" className="form-control" id="state" placeholder="Enter State" onChange={this.handleChange.bind(this, 'state')} />
									</div>
									< div className="form-group">
										<label>Zip Code: </label>
										<input type="text" className="form-control" id="zipCode" placeholder="Enter Zip Code" onChange={this.handleChange.bind(this, 'zip')} />
									</div>
									<div className="form-group">
										<label>Type</label>
										<select className="type" placeholder="Type" onChange={this.handleChange.bind(this, 'type')}>
											<option value='apartment'>Apartment </option>
											<option value='house'>House</option>
											<option value='condo'>Condo</option>
										</select>
									</div>
									< div className="form-group">
										<label>(Average) Rent / month: </label>
										<input type="text" className="form-control" id="rent" placeholder="Enter rent / month" onChange={this.handleChange.bind(this, 'rent')} />
									</div>
								</div>
								<div className="column">
									<div className="form-group">
										<label>Start Date: </label>
										<input className="form-control" type="date" id="startDate" name="startDate" onChange={this.handleChange.bind(this, 'startDate')} />
									</div>
									<div className="form-group">
										<label>End Date: </label>
										<input className="form-control" type="date" id="endDate" name="endDate" onChange={this.handleChange.bind(this, 'endDate')} />
									</div>
									<div className="form-group">
										<label>Bedrooms: </label>
										<input type="text" className="form-control" id='bedrooms' placeholder="Enter number of bedrooms" onChange={this.handleChange.bind(this, 'bedrooms')} />
									</div>
									<div className="form-group">
										<label>Bathrooms: </label>
										<input type="text" className="form-control" id='bathrooms' placeholder="Enter number of bathrooms" onChange={this.handleChange.bind(this, 'bathrooms')} />
									</div>
									<div className="form-group">
										<label>Handicap Accessible:</label>
										<select className="handicap" placeholder="Handicap" onChange={this.handleChange.bind(this, 'handicap')}>
											<option value='no'>No</option>
											<option value='yes'>Yes</option>
										</select>
									</div>
									<div className="form-group">
										<label>Laundry:</label>
										<select className="laundry" placeholder="Laundry" onChange={this.handleChange.bind(this, 'laundry')}>
											<option value='not_available'>Not Available</option>
											<option value='in_building'>In Building</option>
											<option value='in_unit'>In Unit</option>
										</select>
									</div>
									< div className="form-group">
										<label>Description: </label>
										<input type="text" className="form-control desc" id="description" placeholder="Enter Description" onChange={this.handleChange.bind(this, 'description')} />
									</div>
								</div>
								<input onClick={this.addListing} type="submit" value="apply" />

							</form>

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
