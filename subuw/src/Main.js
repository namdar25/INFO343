import React, { Component } from 'react';
import Listing from './Listing';
import Maps from './Maps';
import './Main.css';
import test from './testlisting.json';
import * as SplitPane from "react-split-pane";
import {
    Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Label, Button
} from 'reactstrap';

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            filters: {},
            listings: test
        };

        this.handleChange = this.handleChange.bind(this);
        this.filter = this.filter.bind(this);
        this.reset = this.reset.bind(this);
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
        let listings = this.state.listings;
        listings = listings.filter(function (item) {
            for (var key in params) {
                console.log(item[key])
                console.log(params[key])
                if (key === 'rent' && item[key] > params[key]) {
                    return false;
                } else if (item[key] === undefined || item[key] != params[key] && key !== "rent") {
                    return false;
                }
            }
            return true;
        });
        this.setState({
            listings: listings
        })
    }

    reset(event) {
        let change = this.state.filters;
        delete change[event.target.name]
        this.setState({
            filters: change,
            listings: test
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Navbar color="faded" light expand="md">
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
                                            <Input type="select" name="beds" id="exampleSelect" value={this.state.filters.beds} onChange={this.handleChange} >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Input>
                                        </FormGroup>
                                        <DropdownItem name="beds" value={this.state.filters.beds} onClick={this.reset}>
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
                                            <Input type="select" name="baths" id="exampleSelect" value={this.state.filters.baths} onChange={this.handleChange} >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Input>
                                        </FormGroup>
                                        <DropdownItem name="baths" value={this.state.filters.baths} onClick={this.reset}>
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
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
                <SplitPane split="vertical" defaultSize={300} primary="first">
                    <div className="pane">
                        <div>
                            {this.state.listings.map((d) => {
                                return <Listing listings={d} />
                            })
                            }
                        </div>
                    </div>
                    <div className="pane">
                        <Maps listings={this.state.listings} />
                    </div>
                </SplitPane>
            </div>
        )
    }
}