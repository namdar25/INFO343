import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';



export class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            allConversations: {},
            uid: props.uid,
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

    getNameFromUid(uid, type) {
        let users = this.props.users;
        /*let user = Object.values(users).filter(function (user) {
            return user.uid === uid;
        })
        if (type === "name") {
            return user.length === 1 ? user[0].displayName : undefined;
        } */
    }

    render() {
        console.log(this.props.myConversations)
        let myConversations = [];
        myConversations = this.props.myConversations;
        let uid = this.state.uid;
        return (
            <div>
                {/* <div class="dropdown">
                    <button class="dropbtn">Dropdown
                <i class="fa fa-caret-down"></i>
                    </button>
                    <div class="dropdown-content"> */}

                {myConversations.map((conversation, i) => {
                    console.log(conversation)
                    console.log(conversation.contributors)

                    let otherUid;
                    conversation.contributors.forEach(function (d) {
                        if (d !== uid) {
                            otherUid = d;
                        }
                    })
                    console.log(uid, otherUid)
                    let link = "/Conversation" + (i + 1);
                    if (uid !== otherUid) {
                        return (
                            <Link onClick={() => this.props.showConvo()} to={link}>
                                <h5>Conversation with {otherUid} </h5>
                            </Link>
                        )
                    }
                })}
            </div>
            //     </div >

            // </div >
        )
    }

}

export default Chat;