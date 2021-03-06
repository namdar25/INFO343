import React, { Component } from 'react';
import Listing from './Listing';
import Maps from './Maps';
import test from './testlisting.json';
import * as SplitPane from "react-split-pane";
import firebase from 'firebase';
import './App.css'
import {
    Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, Dropdown, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Label, Button
} from 'reactstrap';

import { Conversation } from './Conversation';

export class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: props.search,
            uid: props.uid,
            modal2: false,
            filters: {},
            listings: [],
            filteredListings: [],
            isDesktop: false,
            dropdownOpen: false,
            currentListing: { lat: 47.6604606, lng: -122.3200445 }
        };

        this.handleChange = this.handleChange.bind(this);
        this.filter = this.filter.bind(this);
        this.reset = this.reset.bind(this);
        this.getCurrentListing = this.getCurrentListing.bind(this);
    }

    componentDidMount() {
        let listingsRef = firebase.database().ref('Listings')
        listingsRef.on('value', (snapshot) => {
            let listings = snapshot.val()
            if (listings != null) {
                let keys = Object.keys(listings);
                listings = Object.values(listings);
                let listingsKey = []
                listings.forEach((d, i) => {
                    d["key"] = keys[i]
                    listingsKey.push(d)
                })
                this.setState({
                    listings: listingsKey,
                    filteredListings: listings
                });
            }
        })
        if (window.innerWidth > 700) {
            this.setState({
                isDesktop: true
            })
        }
    }

    handleChange(event) {
        let change = this.state.filters;
        change[event.target.name] = event.target.value;
        this.setState({
            filters: change
        })
    }


    //Filters listings rendered based on user input
    filter() {
        let params = this.state.filters;
        let filteredListings = this.state.listings;
        filteredListings = filteredListings.filter(function (item) {
            for (var key in params) {
                if (key === 'rent' && item[key] > params[key]) {
                    return false;
                } else if (key === "startDate") {
                    let dateFilter = new Date(item[key]);
                    let date = new Date(params[key]);
                    if (dateFilter < date) {
                        return false;
                    }
                } else if (key === "endDate") {
                    let dateFilter = new Date(item[key]);
                    let date = new Date(params[key]);
                    if (dateFilter < date) {
                        return false;
                    }
                } else if (item[key] === undefined || item[key] != params[key] && key !== "rent") {
                    return false;
                }
            }
            return true;
        });
        this.setState({
            filteredListings: filteredListings
        })
    }

    //resets filters applied to listings
    reset(event) {
        let change = this.state.filters;
        delete change[event.target.name]
        this.setState({
            filters: change,
            filteredListings: this.state.listings
        })
    }

    getCurrentListing(val) {
        this.setState({
            currentListing: val
        })
    }

    render() {
        const isDesktop = this.state.isDesktop;
        let search = 98105
        if (this.state.search) {
            search = this.state.search
        }
        console.log(this.state.currentListing);
        return (
            <div>
                {this.state.filteredListings &&
                    <div>
                        {/* <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Filters
                                <span class="caret"></span>
                            </button> */}
                        {/* <Navbar color="white" light expand="md" className="vertical-nav">
                            <NavbarToggler onClick={this.toggle} />
                            <Nav className="ml-auto" id="verticalNav" navbar> */}
                        <div className="filterContainer">
                            <UncontrolledDropdown direction="left">
                                <DropdownToggle nav caret>
                                    Price
                                        </DropdownToggle>
                                <DropdownMenu right>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                        <Input placeholder="max" name="rent" value={this.state.filters.price} onChange={this.handleChange} />
                                    </InputGroup>
                                    <DropdownItem divider />
                                    <DropdownItem value={this.state.filters.price} onClick={this.reset} name="rent">
                                        Reset
                                            </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown direction="left">
                                <DropdownToggle nav caret>
                                    Beds
                                        </DropdownToggle>
                                <DropdownMenu right>
                                    <FormGroup>
                                        <Input type="select" name="bedrooms" id="exampleSelect" value={this.state.filters.bedrooms} onChange={this.handleChange} >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                    </FormGroup>
                                    <DropdownItem divider />
                                    <DropdownItem name="bedrooms" value={this.state.filters.bedrooms} onClick={this.reset}>
                                        Reset
                                            </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown direction="left">
                                <DropdownToggle nav caret>
                                    Baths
                                        </DropdownToggle>
                                <DropdownMenu right>
                                    <FormGroup>
                                        <Input type="select" name="bathrooms" id="exampleSelect" value={this.state.filters.bathrooms} onChange={this.handleChange} >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                    </FormGroup>
                                    <DropdownItem divider />

                                    <DropdownItem name="bathrooms" value={this.state.filters.bathrooms} onClick={this.reset}>
                                        Reset
                                            </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown direction="left">
                                <DropdownToggle nav caret>
                                    Laundry
                                        </DropdownToggle>
                                <DropdownMenu right>
                                    <FormGroup>
                                        <Input type="select" name="laundry" id="exampleSelect" value={this.state.filters.laundry} onChange={this.handleChange} >
                                            <option>In Unit</option>
                                            <option>In Building</option>
                                            <option>not available</option>
                                        </Input>
                                    </FormGroup>
                                    <DropdownItem divider />

                                    <DropdownItem name="laundry" value={this.state.filters.laundry} onClick={this.reset}>
                                        Reset
                                            </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown direction="left">
                                <DropdownToggle nav caret>
                                    Type
                                        </DropdownToggle>
                                <DropdownMenu right>
                                    <FormGroup>
                                        <Input type="select" name="type" id="exampleSelect" value={this.state.filters.type} onChange={this.handleChange} >
                                            <option>apartment</option>
                                            <option>house</option>
                                            <option>condo</option>
                                        </Input>
                                    </FormGroup>
                                    <DropdownItem divider />

                                    <DropdownItem name="type" value={this.state.filters.type} onClick={this.reset}>
                                        Reset
                                            </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown direction="left">
                                <DropdownToggle nav caret>
                                    Date Range
                                        </DropdownToggle>
                                <DropdownMenu right>
                                    <InputGroup>
                                        <Input placeholder="start-date" name="startDate" value={this.state.filters.start} onChange={this.handleChange} />
                                    </InputGroup>
                                    <DropdownItem divider />
                                    <InputGroup>
                                        <Input placeholder="end-date" name="endDate" value={this.state.filters.end} onChange={this.handleChange} />
                                    </InputGroup>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <Button className="filterBtns" color="primary" onClick={this.filter}>Filter</Button>
                            <Button className="filterBtns" color="primary" onClick={this.reset}>Reset</Button>
                        </div>
                        <SplitPane split="vertical" defaultSize={300} primary="first">
                            <div className="pane">
                                <div>
                                    {this.state.filteredListings.map((d, i) => {
                                        return <Listing showConvo={this.showConvo} listings={d} uid={this.state.uid} index={i} setCurrentListing={this.getCurrentListing} />
                                    })
                                    }
                                </div>
                            </div>
                            {isDesktop &&
                                <div className="pane">
                                    {this.state.currentListing &&
                                        <Maps listings={this.state.currentListing} search={search} />
                                    }
                                </div>
                            }
                            {!isDesktop &&
                                <div>
                                </div>
                            }
                        </SplitPane>

                    </div>
                }
            </div>
        )
    }
}

export default Main;