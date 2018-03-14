//Login.js
import React, { Component } from 'react';
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
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

export class Login extends Component {
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
                    this.setState({
                        user: result.user,
                        modal: false
                    });
                    // Accessed our personal made user to find if they have a profile picture, set as their profile pic, and if not, set as a default pic
                    let userForPic = firebase.auth().currentUser;
                    userForPic = firebase.database().ref('Users/' + userForPic.uid);
                    let pic;
                    userForPic.on('value', (snapshot) => {
                        let currentUser = snapshot.val();
                        pic = currentUser.profilePicture;
                    })
                    if (pic === undefined) {
                        pic = 'https://firebasestorage.googleapis.com/v0/b/subuw-j420m.appspot.com/o/imgs%2Fuser-1633249_960_720.png?alt=media&token=8c1558ac-d0c7-41d2-a1ac-0bdd08f5ee5e'
                    }
                    let newUser = {
                        userID: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        profilePicture: pic
                    };

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
                    // Accessed our personal made user to find if they have a profile picture, set as their profile pic, and if not, set as a default pic

                    let userForPic = firebase.auth().currentUser;
                    userForPic = firebase.database().ref('Users/' + userForPic.uid);
                    let pic;
                    userForPic.on('value', (snapshot) => {
                        let currentUser = snapshot.val();
                        pic = currentUser.profilePicture;
                    })
                    if (pic === undefined) {
                        pic = 'https://firebasestorage.googleapis.com/v0/b/subuw-j420m.appspot.com/o/imgs%2Fuser-1633249_960_720.png?alt=media&token=8c1558ac-d0c7-41d2-a1ac-0bdd08f5ee5e'
                    }

                    let newUser = {
                        userID: user.uid,
                        displayName: user.displayName,
                        email: user.email,
                        profilePicture: pic
                    };

                    let update = {};
                    update[user.uid] = newUser;

                    this.userRef.update(update);
                }
            });
    }

    render() {
        console.log("user: ", this.state.user);
        return (
            <div>
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
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </div>

        )
    }
}
