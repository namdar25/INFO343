import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

class Listing extends Component {
    constructor(props) {
        super(props)
        this.addListing = this.addListing.bind(this);
        this.state = ({
            address: props.address || '',
            city: props.city || '',
            state: props.state || '',
            zip: props.zip || '',
            type: props.type || 'apartment',
            rent: props.rent || '',
            startDate: props.startDate || '',
            endDate: props.endDate || '',
            bedrooms: props.bedrooms || '',
            bathrooms: props.bathrooms || '',
            handicap: props.handicap || 'no',
            laundry: props.laundry || 'not available',
            description: props.description || '',
            lat: props.lat || '',
            long: props.long || '',
            sqrft: props.sqrft || '',
            smoking: props.smoking || 'no',
            pets: props.pets || 'None allowed',
            newListing: {},
            imgs: []
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
                imgs: imgs
            }
            listingsRef.push(listing);
        }).catch(err => {
            this.setState({ errorMessage: err.message })
        });
    }

    render() {
        console.log(this.state.imgs)
        return (
            <div className='addListing' >
                <div className="row">
                    <div className="column">
                        <label>Address: </label>
                        <input type="text" className="form-control" id="address" placeholder="Enter Address" onChange={this.handleChange.bind(this, 'address')} />

                        <label>City: </label>
                        <input type="text" className="form-control" id="city" placeholder="Enter City" onChange={this.handleChange.bind(this, 'city')} />

                        <label>State: </label>
                        <input type="text" className="form-control" id="state" placeholder="Enter State" onChange={this.handleChange.bind(this, 'state')} />

                        <label>Zip Code: </label>
                        <input type="text" className="form-control" id="zipCode" placeholder="Enter Zip Code" onChange={this.handleChange.bind(this, 'zip')} />

                        <label>(Average) Rent / month: </label>
                        <input type="text" className="form-control" id="rent" placeholder="Enter rent / month" onChange={this.handleChange.bind(this, 'rent')} />

                        <label>Square feet: </label>
                        <input type="text" className="form-control" id="sqrft" placeholder="Enter square feet" onChange={this.handleChange.bind(this, 'sqrft')} />
                    </div >
                    <div className="column">

                        <label>Start Date: </label>
                        <input className="form-control" type="date" id="startDate" name="startDate" onChange={this.handleChange.bind(this, 'startDate')} />

                        <label>End Date: </label>
                        <input className="form-control" type="date" id="endDate" name="endDate" onChange={this.handleChange.bind(this, 'endDate')} />

                        <label>Bedrooms: </label>
                        <input type="text" className="form-control" id='bedrooms' placeholder="Enter number of bedrooms" onChange={this.handleChange.bind(this, 'bedrooms')} />

                        <label>Bathrooms: </label>
                        <input type="text" className="form-control" id='bathrooms' placeholder="Enter number of bathrooms" onChange={this.handleChange.bind(this, 'bathrooms')} />
                        <label>Description: </label>
                        <input type="text" className="form-control desc" id="description" placeholder="Enter Description" onChange={this.handleChange.bind(this, 'description')} />
                        <label>Images: </label>
                        <input type="file" onChange={(e) => this.fileChange(e)} multiple />
                    </div>
                    <div className="row">
                        <div className="small">
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
                                <option value='not available'>Not Available </option>
                                <option value='in unit'>In Unit</option>
                                <option value='in building'>In Building</option>
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
                    </div >
                    <input onClick={this.addListing} type="submit" value="Submit Listing" />

                </div >
            </div>


        )
    }
}

export default Listing;