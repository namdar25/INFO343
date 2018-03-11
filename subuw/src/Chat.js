import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';



class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            allConversations: {},
            uid: "me",
        })
    }

    componentDidCatch() {
        firebase.database().ref('conversations/').on('value', (snapshot) => {
            const allConversations = snapshot.val()
            if (allConversations != null) {
                this.setState({
                    allConversations: allConversations,
                })
            }
        })
    }

    getNameFromUid(uid) {
        let users = this.props.users;
        // reference either a list of all our user or something more efficient
    }

    render() {
        let myConversations = [];
        myConversations = this.props.myConversations;
        let uid = this.state.uid;
        return (
            <div>
                <div class="dropdown">
                    <button class="dropbtn">Dropdown
                <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content">

                        {Object.values(myConversations).map((conversation, i) => {
                            let otherUid;
                            conversation.contributors.forEach(function (d) {
                                if (d !== uid) {
                                    otherUid = d;
                                }
                            })
                            let link = "/Conversation" + (i + 1);
                            if (uid !== otherUid) {
                                return (
                                    <Link onClick={(otherUid) => this.props.setReciever(otherUid)} to={link}>
                                        <h5 className="card-title">Conversation with {otherUid} </h5>
                                    </Link>
                                )
                            }
                        })}
                    </div>
                </div >

            </div >
        )
    }

}

export default Chat;