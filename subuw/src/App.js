import React, { Component } from 'react';
//import { Nav, NavItem, MenuItem, Navbar, NavDropdown } from 'react-bootstrap';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Main from './Main';
import '../node_modules/jquery/dist/jquery.js';
import '../node_modules/popper.js/dist/popper.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import { StartPage } from './StartPage';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentItem: '',
            username: '',
            items: [],
            user: null,
            opacity: 0
        }
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user, opacity: 1 });
            } else {
                this.setState({ opacity: 1 });
            }
        });
    }

    logout() {
        firebase.auth().signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    render() {
        return (
            <div className="mainAppDiv" style={{ opacity: this.state.opacity }}>
                <div>
                    <Router>
                        <Navbar color="white" light expand="md">
                            <NavbarBrand href="/" className="navbarBrand">SUBUW</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        {!this.state.user && <LogIn />}
                                    </NavItem>

                                    <NavItem>
                                        {this.state.user &&
                                            <NavLink className="logIn" >
                                                Profile
                                            </NavLink>
                                        }
                                    </NavItem>
                                    <NavItem>
                                        {this.state.user &&
                                            <NavLink className="logIn" >
                                                Host
                                        </NavLink>
                                        }
                                    </NavItem>
                                    <NavItem>
                                        {this.state.user &&
                                            <NavLink className="logIn" >
                                                Contact Us
                                        </NavLink>
                                        }
                                    </NavItem>
                                    <NavItem>
                                        {this.state.user &&
                                            <NavLink className="logIn" onClick={() => { this.logout() }}>Log Out</NavLink>}
                                    </NavItem>


                                </Nav>
                            </Collapse>
                        </Navbar>
                    </Router>
                </div>
                <StartPage />

            </div >
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
        this.userRef = firebase.database().ref('Users');

        this.toggle = this.toggle.bind(this);
        this.login = this.login.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    // handleChange(e) {
    //     /* ... */
    // }

    login() {
        let provider = new firebase.auth.GoogleAuthProvider();
        // let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                console.log("result.user: ", result.user);
                if (user && user.uid) {
                    this.setState({
                        user: result.user,
                        modal: false
                    });

                    let newUser = {
                        userID: user.uid,
                        displayName: user.displayName,
                        email: user.email
                    };

                    let update = {};
                    update[user.uid] = newUser;

                    this.userRef.update(update);
                }
            });
    }



    // <span onClick={this.logout}>Log Out</span>
    render() {
        console.log("user: ", this.state.user);
        return (
            <div>
                <div>
                    <Button className="logIn" onClick={this.toggle}>Log In</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} >
                        <ModalHeader toggle={this.toggle}>Log In options:</ModalHeader>
                        <ModalBody>
                            <div className="wrapper">
                                {!this.state.user && <i onClick={this.login} className="fab fa-google"></i>
                                }

                            </div>
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
