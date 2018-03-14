//start page
import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Row, Col, Grid, FormControl, FormGroup } from 'react-bootstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Button } from 'reactstrap';
import { HashRouter as Router, Route, Link } from "react-router-dom";

export class StartPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "98105"
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
            <div className="profileBackground">
                {this.props.user &&
                    <div className="search-input" >
                        <Router>
                            <Link type="button" className="btn btn-secondary submitButton" to="/Main"> <h2>Start Searching!</h2></Link>
                        </Router>
                    </div>
                }
            </div>
        )

    }
}

