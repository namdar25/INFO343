//start page
import React, { Component } from 'react';
import firebase from 'firebase';
import './StartPage.css';
import { Container, Row, Col, Grid, FormControl, FormGroup } from 'react-bootstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';


export class StartPage extends Component {
    render() {
        return (
            <div className="All">
                <div className="search-input" >
                    <InputGroup>
                        <Input className="search-input-tag" placeholder="Enter city or zip code..." />
                        <InputGroupAddon addonType="append">
                            <InputGroupText><i class="fas fa-search"></i></InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>

                </div>
                {/* <FormGroup >
                        <InputGroup>
                            <FormControl type="text" className="search-input" placeholder="Enter Zip code..." aria-label="Enter Zip code..." aria-describedby="basic-addon2" />
                            <InputGroup.Addon>Submit</InputGroup.Addon>
                        </InputGroup>
                    </FormGroup> */}
                {/* <form className="search-input" >
                        <input type="text" className="search-input-tag" placeholder=" Enter Zip code..." aria-label="Enter Zip code..." aria-describedby="basic-addon2" />
                        <button type="submit"><i className="search Icon fa fa-search"></i></button>
                    </form> */}
                {/* <input type="text" className="search" placeholder="Enter Zip code..." aria-label="Enter Zip code..." aria-describedby="basic-addon2" /> */}
            </div >
        )

    }
}