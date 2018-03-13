import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './App.css';
import { Conversation } from './Conversation';



export class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            allConversations: {},
            uid: props.uid,
            dropdownOpen: false
        })
        this.toggle = this.toggle.bind(this);
        this.closeConvo = this.closeConvo.bind(this);
    }

    componentDidCatch() {
        firebase.database().ref('conversations/').on('value', (snapshot) => {
            const allConversations = snapshot.val()
            if (allConversations != null) {
                this.setState({
                    allConversations: allConversations
                })
            }
        })
    }

    getNameFromUid(uid) {
        let users = this.props.users;
        let user = Object.values(users).filter(function (user) {
            return user.userID === uid;
        })
        console.log("the user", user)
        console.log(user.length === 1 ? user[0].displayName : undefined)
        return user.length === 1 ? user[0].displayName : undefined;
    }

    toggle() {
        console.log('co')
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    callConvo(conversation) {
        var change = {};
        change[conversation] = true;
        console.log(conversation)
        this.setState(change)
    }

    closeConvo(conversation) {
        var change = {};
        change[conversation] = false;
        console.log(conversation)
        this.setState(change)
    }


    render() {
        console.log(this.props.myConversations)
        console.log(this.props.users)
        let myConversations = [];
        myConversations = this.props.myConversations;
        let uid = this.state.uid;
        console.log(this.state.Conversation1)

        return (
            <div>
                <ButtonDropdown direction="left" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret size="lg">
                        My Chats
                    </DropdownToggle >
                    <DropdownMenu>
                        {myConversations.map((conversation, i) => {
                            console.log(conversation)
                            console.log(conversation.contributors)

                            let otherUid;
                            conversation.contributors.forEach(function (d) {
                                if (d !== uid) {
                                    otherUid = d;
                                }
                            })

                            let name = this.getNameFromUid.call(this, otherUid);
                            console.log(uid, otherUid)
                            let link = "Conversation" + (i + 1);
                            if (uid !== otherUid) {
                                return (
                                    <DropdownItem Action >
                                        {/* <Link onClick={() => this.props.showConvo()} to={link}>
                                            <h5>Message {name} </h5>
                                        </Link> */}
                                        <p onClick={this.callConvo.bind(this, link)}> Message {name} </p>
                                        <Conversation users={this.props.users} modal={this.state[link]} uid={this.state.uid} recieverUid={otherUid} closeConvo={this.closeConvo} convoLink={link} />
                                    </DropdownItem>
                                )
                            }
                        })}
                    </DropdownMenu>
                </ButtonDropdown>

            </div >
        )
    }

}

export default Chat;