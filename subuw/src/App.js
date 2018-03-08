import React, { Component } from 'react';
import { Nav, NavItem, MenuItem, Navbar, NavDropdown } from 'react-bootstrap';
import { HashRouter as Router, Route, Link } from "react-router-dom";
// import { LogIn } from './LogIn';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { StartPage } from './StartPage';

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Router>
                        <div>
                            <Navbar className="navbar">
                                <Navbar.Header>
                                    <Navbar.Brand>
                                        <a href="#brand">SUBUW</a>
                                    </Navbar.Brand>
                                    <Navbar.Toggle />
                                </Navbar.Header>
                                <Navbar.Collapse>
                                    <Nav pullRight>
                                        {/* <NavItem eventKey={2} href="#">
                                Sign In
                            </NavItem> */}
                                        <NavItem eventKey={2} href="#">
                                            <LogIn />
                                        </NavItem>
                                    </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </div>
                    </Router>
                </div>
                <StartPage />

            </div>
        );
    }
}

class LogInPop extends Component {
    render() {
        return (
            <div className="logInPopUp">
                <div className="card-body">
                    <p> Please Log in with one of the following options: </p>
                </div>
            </div>
        )
    }
}

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div>
                <div>
                    <Button color="danger" onClick={this.toggle}>Log In</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Log In options:</ModalHeader>
                        <ModalBody>
                            OMG LET ME LOG IN
                            OMG LET ME LOG IN
                            OMG LET ME LOG IN
                            OMG LET ME LOG IN
                            OMG LET ME LOG IN
                            OMG LET ME LOG IN
                            OMG LET ME LOG IN
                            OMG LET ME LOG IN
                            OMG LET ME LOG IN
                 </ModalBody>
                        <ModalFooter>
                            {/* <Button color="primary" onClick={this.toggle}>Do Something</Button> */}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>

        )
    }
}

export default App;
