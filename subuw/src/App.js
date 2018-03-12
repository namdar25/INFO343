import React, { Component } from 'react';
//import { Nav, NavItem, MenuItem, Navbar, NavDropdown } from 'react-bootstrap';
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
import 'firebase/auth';
import 'firebase/database';
import './Main.css';
import { Main } from './Main';
import { Conversation } from './Conversation.js';

class App extends Component {
  constructor(props) {
    super(props);

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
    this.getSearch = this.getSearch.bind(this);
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
    let uid = this.state.uid;
    console.log(this.state.users)
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
                    <LogIn setUid={this.setUid} />
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
                      <Link className="logIn" to="/Main">Home</Link>
                    </NavItem>

                    <NavItem>
                      <Link className="logIn" to="/">Profile</Link>
                    </NavItem>
                    <NavItem>
                      <Link className="logIn" to="/AddListing">Host</Link>
                    </NavItem>
                    <NavItem>
                      <Link className="logIn" to="/about">About</Link>
                    </NavItem>
                    <NavItem>
                      <Chat id="chatButton" myConversations={myConversations} showConvo={this.showConvo} uid={this.state.uid} users={this.state.users} />
                      {/*<Link className="logIn" to="/chat"> Chat </Link>*/}
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
                <Main search={this.state.search} uid={this.state.uid} />
              )} />}
              {/* <Route path="/chat" render={(props) => (
                <Chat myConversations={myConversations} showConvo={this.showConvo} uid={this.state.uid} />
              )} /> */}
              <Route path="/AddListing" render={(props) => (
                <AddListing uid={this.state.uid} />
              )} />
              {/* {this.state.showConvo &&
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
              } */}
            </div>
          </Router>}
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
    this.loginFB = this.loginFB.bind(this);
    this.loginG = this.loginG.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  loginG() {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log("result.user google: ", result.user);
        if (user && user.uid) {



          let newUser = {
            userID: user.uid,
            displayName: user.displayName,
            email: user.email
          };

          this.setState({
            user: result.user,
            modal: false,
          });
          console.log(this.props)
          this.props.setUid(newUser.userID);

          let update = {};
          update[user.uid] = newUser;

          this.userRef.update(update);
        }
      });
  }

  loginFB() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log("result.user fb: ", result.user);
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
                {!this.state.user && <i onClick={this.loginG} className="fab fa-google"></i>
                }
              </div>
              <div className="wrapper">
                {!this.state.user && <i onClick={this.loginFB} className="fab fa-facebook-square"></i>
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
