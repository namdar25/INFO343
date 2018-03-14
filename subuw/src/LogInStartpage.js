//Login Start Page
import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Row, Col, Grid, FormControl, FormGroup } from 'react-bootstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input, Button } from 'reactstrap';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Login } from './Login';
import './LogInStartpage.css';

export class LogInStartpage extends Component {
    render() {
        return (
            <div className="profileBackground">
                <h1>SUBUW: MAKING SUBLEASING FUN</h1>
                <div className="container">
                    <div class="card">
                        <div class="card-body">
                            <p>Having an issue finding a place to sublease?<br></br>
                                You are in luck, SUBUW is here to help!<br></br>
                                Log in now and find your dream part-time home</p>
                            <div className="LogInStartPage">
                                <Login />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}