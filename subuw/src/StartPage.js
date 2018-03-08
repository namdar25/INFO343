//start page
import React, { Component } from 'react';
import firebase from 'firebase';
import './StartPage.css';
import { Container, Row, Col, Grid, FormControl, FormGroup, InputGroup } from 'react-bootstrap';


export class StartPage extends Component {
    render() {
        return (
            <div className="All">
                <div className="search-input">
                    {/* <FormGroup >
                        <InputGroup>
                            <FormControl type="text" className="search" placeholder="Enter Zip code..." aria-label="Enter Zip code..." aria-describedby="basic-addon2" />
                            <InputGroup.Addon>Submit</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup> */}
                    <input type="text" className="search" placeholder="Enter Zip code..." aria-label="Enter Zip code..." aria-describedby="basic-addon2" />
                    <button type="submit"><i className="searchIcon fa fa-search"></i></button>
                </div>
                {/* <input type="text" className="search" placeholder="Enter Zip code..." aria-label="Enter Zip code..." aria-describedby="basic-addon2" /> */}
            </div>
        )

    }
}