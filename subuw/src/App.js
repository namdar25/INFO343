import React, { Component } from 'react';
import { Link } from "react-router-dom";
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

        this.state = {
            uid: "jon",
            allConversations: {},
            currentItem: '',
            username: '',
            items: [],
            user: null,
            opacity: 0,
            search: null,
            showConvo: false,
            isOpen: false
        }

        this.toggle = this.toggle.bind(this);
        this.getSearch = this.getSearch.bind(this);
        this.getMyConversations = this.getMyConversations.bind(this);
        this.showConvo = this.showConvo.bind(this);
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
        firebase.database().ref('conversations/').on('value', (snapshot) => {
            const allConversations = snapshot.val()
            if (allConversations != null) {
                this.setState({
                    allConversations: allConversations,
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
                                        <LogIn />
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
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
                                            <Link className="logIn" to="/">Host</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link className="logIn" to="/about">About</Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link className="logIn" to="/chat"> Chat </Link>
                                        </NavItem>
                                        <NavItem>
                                            <button className="logIn" onClick={() => { this.logout() }}>Log Out</button>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                            </Navbar>
                            <Route exact path="/" component={(props) => (
                                <StartPage sendSearch={this.getSearch} />
                            )} />
                            <Route path="/about" component={About} />
                            {<Route path="/Main" component={(props) => (
                                <Main search={this.state.search} />
                            )} />}
                            <Route path="/chat" render={(props) => (
                                <Chat myConversations={myConversations} showConvo={this.showConvo} uid={this.state.uid} />
                            )} />
                            {this.state.showConvo &&
                                myConversations.map((conversation, i) => {
                                    let path = '/Conversation' + (i + 1);
                                    let recieverUid;
                                    conversation.contributors.forEach(function (curUid) {
                                        if (curUid !== uid) {
                                            recieverUid = curUid;
                                        }
                                    })
                                    if (recieverUid !== uid) {
                                        return (
                                            <div>
                                                <Route path={path} render={(props) => (
                                                    <Conversation modal={true} uid={this.state.uid} recieverUid={recieverUid} />
                                                )} />
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </Router>}
            </div >
        );
    }
}

export default App;
