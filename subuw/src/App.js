import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Collapse,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'jquery/dist/jquery.js';
import './App.css';
import { Chat } from './Chat.js';
import { StartPage } from './StartPage';
import { About } from './About';
import { AddListing } from './AddListing.js';
import firebase from 'firebase';
import { Login } from './Login';
import 'firebase/auth';
import 'firebase/database';
import './Main.css';
import { Main } from './Main';
import { Conversation } from './Conversation.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.getSearch = this.getSearch.bind(this);
        this.state = {
            allConversations: {},
            currentItem: '',
            username: '',
            items: [],
            user: null,
            opacity: 0,
            search: null,
            showConvo: false,
            isOpen: false,
            users: {}
        }

        this.toggle = this.toggle.bind(this);
        this.getMyConversations = this.getMyConversations.bind(this);
        this.showConvo = this.showConvo.bind(this);
        this.setUid = this.setUid.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user, opacity: 1, uid: user.uid });
            } else {
                this.setState({ opacity: 1 });
            }
        });

        firebase.database().ref('conversations/').on('value', (snapshot) => {
            const allConversations = snapshot.val()
            if (allConversations != null) {
                this.setState({
                    allConversations: allConversations,
                })
            }
        })

        firebase.database().ref('Users/').on('value', (snapshot) => {
            const currentUsers = snapshot.val()
            if (currentUsers != null) {
                console.log(currentUsers)
                this.setState({
                    users: currentUsers
                })
            }
        })
        let myConversations = this.getMyConversations();
        this.setState({
            myConversations: myConversations
        })



    }

    getMyConversations() {
        let uid = this.state.uid;
        let myConversations = [];
        var allConversations = this.state.allConversations;
        console.log(allConversations)
        Object.values(allConversations).forEach(function (conversation) {
            let pair = conversation.contributors; //the array of the two users in conversation
            if (pair.includes(uid)) { //If current user is in this conversation
                myConversations.push(conversation);
            }
        })
        return myConversations;
        // this.state.myConversations = myConversations;
    }

    showConvo() {
        this.setState({
            showConvo: true
        })
    }

    setUid(uid) {
        console.log("ok")

        this.setState({
            uid: uid
        })
    }

    logout() {
        firebase.auth().signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }


    getSearch(val) {
        this.setState({
            search: val
        })
    }

    render() {
        let myConversations = this.getMyConversations();
        console.log(myConversations)
        let uid = this.state.uid;
        console.log(this.state.showConvo)
        return (
            <div className="mainAppDiv" style={{ opacity: this.state.opacity }}>
                {!this.state.user &&
                    <div>
                        <Navbar color="white" light expand="md">
                            <NavbarBrand href="/" className="navbarBrand">SUBUW</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Login />
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                        <StartPage sendSearch={() => { this.sendSearch() }} />
                    </div>
                }
                {this.state.user &&
                    <Router>
                        <div>
                            <Navbar color="white" light expand="md">
                                <NavbarBrand className="navbarBrand">SUBUW</NavbarBrand>
                                <NavbarToggler onClick={this.toggle} />
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <Link className="logIn" to="/">Home</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link className="logIn" to="/">Profile</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link className="logIn" to="/AddListing">Add Listing</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link className="logIn" to="/about">About</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Chat id="chatButton" myConversations={myConversations} showConvo={this.showConvo} uid={this.state.uid} users={this.state.users} />
                                        </NavItem>
                                        <NavItem>
                                            <Link className="logIn" to="/" onClick={() => { this.logout() }}>Log Out</Link>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                            <Route exact path="/" component={(props) => (
                                <StartPage sendSearch={this.getSearch} />
                            )} />
                            <Route path="/about" component={About} />
                            <Route path="/AddListing" render={(props) => (
                                <AddListing uid={this.state.uid} />
                            )} />
                            <Route path="/Main" component={(props) => (
                                <Main search={this.state.search} uid={this.state.uid} />
                            )} />
                            }
                    </div>
                    </Router>}
            </div >
        );
    }
}

export default App;
