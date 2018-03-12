import React, { Component } from 'react';
import { Link } from "react-router-dom";
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
import { StartPage } from './StartPage';
import { About } from './About';
import firebase from 'firebase';
import { Login } from './Login';
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
                <Navbar color="white" light expand="md">
                    <NavbarBrand href="/" className="navbarBrand">SUBUW</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                {!this.state.user && <Login />}
                            </NavItem>
                            <NavItem>
                                {this.state.user &&
                                    <NavLink className="logIn">
                                        <Link to="/">Home</Link>
                                    </NavLink>
                                }
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
                                    <NavLink className="logIn">
                                        <Link to="about">About</Link>
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
                <div className="container">
                    {this.props.children}
                </div>
            </div >
        );
    }
}



export default App;
