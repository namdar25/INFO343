
import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

import $ from 'jquery';

export class AddListing extends Component {
    constructor(props) {
        super(props)
        this.addListing = this.addListing.bind(this);
        this.state = ({
            address: props.listing.address || '',
			city: props.listing.city || '',
			state: props.listing.state || '',
			zip: props.listing.zip || '',
			type: props.listing.type || 'apartment',
			rent: props.listing.rent || '',
			startDate: props.listing.startDate || '',
			endDate: props.listing.endDate || '',
			bedrooms: props.listing.bedrooms || '',
			bathrooms: props.listing.bathrooms || '',
			handicap: props.listing.handicap || 'no',
			laundry: props.listing.laundry || 'not available',
			description: props.listing.description || '',
			lat: props.listing.lat || '',
			long: props.listing.long || '',
			sqrft: props.listing.sqrft || '',
			smoking: props.listing.smoking || 'no',
			pets: props.listing.pets || 'None allowed',
			parking: props.listing.parking || 'none',
            imgs: [],
            uid: props.uid || 'test'
        })
    }

    componentDidMount() {
        this.dataRef = firebase.database().ref('imgs/')
        this.storageRef = firebase.storage().ref('imgs/')

        // When the database 'value' changes, change the state of `imgs`
        // this.dataRef.on('value', (snapshot) => {
        //     console.log('snapshot', snapshot.val())
        //     this.setState({
        //         imgs: snapshot.val() || {}
        //     })
        // })
    }

    fileChange(event) {
        let name = event.target.files[0].name;
        let file = event.target.files[0];
        let imgs = this.state.imgs;
        console.log(name, file)
        let imgRef = this.storageRef.child(name);
        imgRef.put(file).then((snapshot) => {
            let url = snapshot.downloadURL;
            imgs.push(url);
            this.setState({
                imgs: imgs
            })
            this.dataRef.push({
                imageurl: url
            }).catch(err => {
                this.setState({
                    errorMessage: err.message
                })
            })
        });

    }

    handleChange(propertyName, event) {
        this.setState({
            errorMessage: null
        })
        var change = {};
        change[propertyName] = event.target.value;
        console.log(event.target.value, propertyName)
        this.setState(change)
        console.log(this.state.sqrft)
    }

    addListing(event) {
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
        let smoking = this.state.smoking;
        let pets = this.state.pets;
        let sqrft = this.state.sqrft;
        let imgs = this.state.imgs;
        let uid = this.state.uid;

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
            let listingsRef = firebase.database().ref('Listings');
            console.log(lat)
            console.log(handicap)
            let listing = {
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
                smoking: smoking,
                pets: pets,
                sqrft: sqrft,
                imgs: imgs,
                description: description,
                lat: lat,
                long: lng,
                imgs: imgs,
                uid: uid
            }
            listingsRef.push(listing);
        }).catch(err => {
            this.setState({ errorMessage: "Invalid Address" })
        });
        $('.listing').val('');
    }

    render() {
        console.log(this.state.imgs)
        return (
            <div className="addListing">
                {this.state.errorMessage &&
                    <p className="alert alert-danger">{this.state.errorMessage}</p>}
                <div className='addListing' >
                    <div className="row">
                        <div className="column">
                            <label>Address: </label>
                            <input type="text" className="listing" id="address" placeholder="Enter Address" onChange={this.handleChange.bind(this, 'address')} />

                            <label>City: </label>
                            <input type="text" className="listing" id="city" placeholder="Enter City" onChange={this.handleChange.bind(this, 'city')} />

                            <label>State: </label>
                            <input type="text" className="listing" id="state" placeholder="Enter State" onChange={this.handleChange.bind(this, 'state')} />

                            <label>Zip Code: </label>
                            <input type="text" className="listing" id="zipCode" placeholder="Enter Zip Code" onChange={this.handleChange.bind(this, 'zip')} />

                            <label>(Average) Rent / month: </label>
                            <input type="text" className="listing" id="rent" placeholder="Enter rent / month" onChange={this.handleChange.bind(this, 'rent')} />

                            <label>Square feet: </label>
                            <input type="text" className="listing" id="sqrft" placeholder="Enter square feet" onChange={this.handleChange.bind(this, 'sqrft')} />
                        </div >
                        <div className="column">

                            <label>Start Date: </label>
                            <input className="listing" type="date" id="startDate" name="startDate" onChange={this.handleChange.bind(this, 'startDate')} />

                            <label>End Date: </label>
                            <input className="listing" type="date" id="endDate" name="endDate" onChange={this.handleChange.bind(this, 'endDate')} />

                            <label>Bedrooms: </label>
                            <input type="text" className="listing" id='bedrooms' placeholder="Enter number of bedrooms" onChange={this.handleChange.bind(this, 'bedrooms')} />

                            <label>Bathrooms: </label>
                            <input type="text" className="listing" id='bathrooms' placeholder="Enter number of bathrooms" onChange={this.handleChange.bind(this, 'bathrooms')} />
                            <label>Description: </label>
                            <textarea className="listing" id="description" placeholder="Enter Description" onChange={this.handleChange.bind(this, 'description')} />
                        </div>
                        <div className="row">
                            <div className="column small">
                                <label>Image 1:</label>
                                <input type="file" onChange={(e) => this.fileChange(e)} multiple />
                            </div>
                            <div className="column small">
                                <label>Image 2:</label>
                                <input type="file" onChange={(e) => this.fileChange(e)} multiple />
                            </div>
                            <div className="column small">
                                <label>Image 3:</label>
                                <input type="file" onChange={(e) => this.fileChange(e)} multiple />
                            </div>
                            <div className="column small">
                                <label>Image 4:</label>
                                <input type="file" onChange={(e) => this.fileChange(e)} multiple />
                            </div>
                            <div className="column small">
                                <label>Image 5:</label>
                                <input type="file" onChange={(e) => this.fileChange(e)} multiple />
                            </div>
                            <div className="column small">
                                <label>Image 6:</label>
                                <input type="file" onChange={(e) => this.fileChange(e)} multiple />
                            </div>
                        </div>
                        <div className="row">
                            <div className="column small">
                                <label>Type</label>
                                <select className="type" placeholder="Type" onChange={this.handleChange.bind(this, 'type')}>
                                    <option value='apartment'>Apartment </option>
                                    <option value='house'>House</option>
                                    <option value='condo'>Condo</option>
                                </select>
                            </div>
                            <div className="column small">
                                <label>Handicap</label>
                                <select className="handicap" placeholder="Handicap" onChange={this.handleChange.bind(this, 'handicap')}>
                                    <option value='yes'>Yes </option>
                                    <option value='no'>No</option>
                                </select>
                            </div>
                            <div className="column small">
                                <label>Laundry</label>
                                <select className="laundry" placeholder="laundry" onChange={this.handleChange.bind(this, 'laundry')}>
                                    <option value='Not Available'>Not Available </option>
                                    <option value='In Unit'>In Unit</option>
                                    <option value='In Building'>In Building</option>
                                </select>
                            </div>
                            <div className="column small">
                                <label>Smoking Allowed</label>
                                <select className="smoking" placeholder="smoking" onChange={this.handleChange.bind(this, 'smoking')}>
                                    <option value='yes'>Yes </option>
                                    <option value='no'>No</option>
                                </select>
                            </div>
                            <div className="column small">
                                <label>Pets</label>
                                <select className="pets" placeholder="pets" onChange={this.handleChange.bind(this, 'pets')}>
                                    <option value='all'>All allowed</option>
                                    <option value='none'>None allowed</option>
                                    <option value='no large pets'>No Large Pets</option>
                                </select>
                            </div>
                            <div className="column small">
                                <label>Parking</label>
                                <select className="parking" placeholder="parking" onChange={this.handleChange.bind(this, 'parking')}>
                                    <option value='none'>None</option>
                                    <option value='paid'>Paid</option>
                                    <option value='free'>Free</option>
                                </select>
                            </div>
                        </div >
                        <input className="listing" onClick={this.addListing} type="submit" value="Submit Listing" />

                    </div >
                </div>

            </div>
        )
    }
}

export default AddListing;
