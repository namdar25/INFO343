//start page
import React, { Component } from 'react';
import firebase from 'firebase';
import './StartPage.css';
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
            <div className="startPageBackground">
                {this.props.user &&
                    <div className="search-input" >
                        <Router>
                            <InputGroup>
                                <Button color="secondary" size="lg" onClick={this.passSearch} block><Link to="/Main"><i className="fas fa-search"></i>Start your search!</Link> </Button>
                            </InputGroup>
                        </Router>
                    </div>
                }
            </div>
        )

    }
}

export default StartPage