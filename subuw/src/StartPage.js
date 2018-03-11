//start page
import React, { Component } from 'react';
import firebase from 'firebase';
import './StartPage.css';
import { Container, Row, Col, Grid, FormControl, FormGroup } from 'react-bootstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';


export class StartPage extends Component {
    render() {
        return (
            <div>
                <div className="startPageBackground"></div>
                <div className="All">
                    <div className="search-input" >
                        <InputGroup>
                            <Input className="search-input-tag" placeholder="Enter city or zip code..." />
                            <InputGroupAddon addonType="append">
                                <InputGroupText><i className="fas fa-search"></i></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>

                    </div>
                </div>
            </div>
        )

    }
}