//start page
import React, { Component } from 'react';
import firebase from 'firebase';
import './StartPage.css';
import { Container, Row, Col, Grid, FormControl, FormGroup } from 'react-bootstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import { HashRouter as Router, Route, Link } from "react-router-dom";

export class StartPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ""
        }

        this.passSearch = this.passSearch.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }

    updateSearch(event) {
        this.setState({
            search: event.target.value
        })
    }


    passSearch() {
        console.log(this.state.search);
        this.props.sendSearch(this.state.search);
    }

    render() {
        return (
            <div className="All">
                <div className="search-input" >
                    <Router>
                        <InputGroup>
                            <Input onChange={(event) => { this.updateSearch(event) }} value={this.state.search} name="search" className="search-input-tag" placeholder="Enter city or zip code..." />
                            <InputGroupAddon addonType="append">
                                <InputGroupText><Link to="/Main" onClick={this.passSearch}><i className="fas fa-search"></i></Link></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Router>
                </div>
            </div>
        )

    }
}