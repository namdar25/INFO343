import React, { Component } from 'react';
import Listing from './Listing';
import Maps from './Maps';
import './Main.css';
import test from './testlisting.json';
import * as SplitPane from "react-split-pane";
import firebase from 'firebase';
import {
    Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Label, Button
} from 'reactstrap';

export class Main extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            filters: {},
            listings: [],
            filteredListings: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.filter = this.filter.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        let listingsRef = firebase.database().ref('Listings')
        listingsRef.on('value', (snapshot) => {
            let listings = snapshot.val()
            listings = Object.values(listings)
            this.setState({
                listings: listings,
                filteredListings: listings
            });
        })
        console.log(this.state.filteredListings)
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleChange(event) {
        let change = this.state.filters;
        change[event.target.name] = event.target.value;
        this.setState({
            filters: change
        })
    }

    filter() {
        let params = this.state.filters;
        let filteredListings = this.state.listings;
        filteredListings = filteredListings.filter(function (item) {
            for (var key in params) {
                console.log("item:" + item[key])
                console.log("key:" + params[key])
                if (key === 'rent' && item[key] > params[key]) {
                    return false;
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

    reset(event) {
        let change = this.state.filters;
        delete change[event.target.name]
        this.setState({
            filters: change,
            filteredListings: this.state.listings
        })
    }

    render() {
        return (
            <div>
                {this.state.filteredListings &&
                    <div>
                        <div>
                            <Navbar color="white" light expand="md">
                                <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <UncontrolledDropdown nav inNavbar>
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
                                        <InputGroup className="zip">
                                            <Input placeholder="Zip Code" name="zip" value={this.state.filters.zip} onChange={this.handleChange} />
                                        </InputGroup>
                                        <UncontrolledDropdown nav inNavbar>
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
                                                <DropdownItem name="bedrooms" value={this.state.filters.bedrooms} onClick={this.reset}>
                                                    Reset
                                        </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <UncontrolledDropdown nav inNavbar>
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
                                                <DropdownItem name="bathrooms" value={this.state.filters.bathrooms} onClick={this.reset}>
                                                    Reset
                                        </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                                Laundry
                                    </DropdownToggle>
                                            <DropdownMenu right>
                                                <FormGroup>
                                                    <Input type="select" name="laundry" id="exampleSelect" value={this.state.filters.laundry} onChange={this.handleChange} >
                                                        <option>In-Unit</option>
                                                        <option>In-Building</option>
                                                        <option>Not Available</option>
                                                    </Input>
                                                </FormGroup>
                                                <DropdownItem name="laundry" value={this.state.filters.laundry} onClick={this.reset}>
                                                    Reset
                                        </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                                Type
                                    </DropdownToggle>
                                            <DropdownMenu right>
                                                <FormGroup>
                                                    <Input type="select" name="type" id="exampleSelect" value={this.state.filters.type} onChange={this.handleChange} >
                                                        <option>Apartment</option>
                                                        <option>House</option>
                                                        <option>Condo</option>
                                                    </Input>
                                                </FormGroup>
                                                <DropdownItem name="type" value={this.state.filters.type} onClick={this.reset}>
                                                    Reset
                                        </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                                Date Range
                                    </DropdownToggle>
                                            <DropdownMenu right>
                                                <InputGroup>
                                                    <Input placeholder="start-date" name="startDate" value={this.state.filters.start} onChange={this.handleChange} />
                                                </InputGroup>
                                                <InputGroup>
                                                    <Input placeholder="end-date" name="endDate" value={this.state.filters.end} />
                                                </InputGroup>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                        <Button color="primary" onClick={this.filter}>Filter</Button>
                                        <Button color="primary" onClick={this.reset}>Reset</Button>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                        </div>
                        <SplitPane split="vertical" defaultSize={300} primary="first">
                            <div className="pane">
                                <div>
                                    {this.state.filteredListings.map((d) => {
                                        return <Listing listings={d} />
                                    })
                                    }
                                </div>
                            </div>
                            <div className="pane">
                                <Maps listings={this.state.filteredListings} />
                            </div>
                        </SplitPane>
                    </div>
                }
            </div>
        )
    }
}

export default Main;