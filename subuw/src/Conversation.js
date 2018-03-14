import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import $ from 'jquery';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Collapse,
    Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink
} from 'reactstrap';



export class Conversation extends Component {
    constructor(props) {
        super(props)
        this.submitMessage = this.submitMessage.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = ({
            uid: props.uid,
            recieverUid: props.recieverUid,
            currentMessages: {},
            message: ''

        })
    }

    componentDidMount() {
        let front;
        let back;
        let chats = firebase.database().ref('conversations/');
        let uid = this.state.uid;
        let recieverUid = this.state.recieverUid;
        if (uid !== recieverUid) {
            chats.on('value', function (snapshot) { //only goes in here for first set up, I want to go in every time a messaged is added(seems to skip it)
                front = snapshot.hasChild(uid + "-" + recieverUid);
                back = snapshot.hasChild(recieverUid + "-" + uid);
                if (!front && !back) {
                    chats.child(uid + '-' + recieverUid).set({
                        contributors: [uid, recieverUid]
                    })
                    front = true;
                }
            });
            let child;
            if (front) {
                child = this.state.uid + "-" + this.state.recieverUid;
            } else {
                child = this.state.recieverUid + "-" + this.state.uid;
            }
            this.setState({
                chatId: child
            })
            firebase.database().ref('conversations/' + child).on('value', (snapshot) => {
                const currentMessages = snapshot.val()
                if (currentMessages != null) {
                    this.setState({
                        currentMessages: currentMessages
                    })
                }
            })
        }
        if ($(".chatlogs")[0] !== undefined) {
            $(".chatlogs").stop().animate({ scrollTop: $(".chatlogs")[0].scrollHeight * 40 }, 100);
        }
    }

    updateMessage(event) {
        this.setState({
            message: event.target.value
        })
    }

    getImgUrl(uid) {
        let users = this.props.users;
        let user = Object.values(users).filter(function (user) {
            return user.userID === uid;
        })
        return user.length === 1 ? user[0].profilePicture : undefined;
    }

    submitMessage(event) {
        event.preventDefault();
        const nextMessage = this.state.message;
        if (nextMessage != '') {
            let message = {
                sender: this.state.uid,
                text: nextMessage
            }
            let conversation = firebase.database().ref('conversations/' + this.state.chatId);
            conversation.push(message);
        }
        this.setState({
            message: ''
        })
        if (!this.props.miniMessage) {
            $(".chatlogs").stop().animate({ scrollTop: $(".chatlogs")[0].scrollHeight }, 50);
        }
        $('#messageBox').val('');
    }

    printMessages(currentMessages) {
        let output = Object.values(currentMessages).map((message, i) => {
            if (message.text !== undefined) {
                let person;
                let img;
                if (message.sender === this.state.uid) {
                    person = 'chat self';
                    img = this.getImgUrl(message.sender);
                } else {
                    person = 'chat friend';
                    img = this.getImgUrl(message.sender);
                }
                if (message.text !== null) {

                    return (
                        <div>
                            {!img &&
                                <div className={person}>
                                    <div className="user-photo"></div>
                                    <p className='chat-message'>{message.text}</p>
                                </div>
                            }
                            {img &&
                                <div className={person}>
                                    <div className="user-photo"><img src={img} alt={"Profile Picture of"} /> </div>
                                    <p className='chat-message'>{message.text}</p>
                                </div>
                            }
                        </div>
                    )
                }
            }
        })
        return output;
    }

    toggle() {
        if (this.props.closeConvo) {
            () => this.props.closeConvo(this.props.convoLink)
        } else {
            () => this.props.toggle2()
        }
    }

    render() {
        let currentMessages = this.state.currentMessages;
        return (
            <div>

                <Modal isOpen={this.props.modal} id="chatModal" toggle={this.toggle} autoFocus={false} >
                    <ModalHeader>
                        {this.props.closeConvo &&
                            <Button color="secondary" onClick={() => this.props.closeConvo(this.props.convoLink)}>Close</Button>
                        }
                        {!this.props.closeConvo &&
                            <Button color="secondary" onClick={() => this.props.toggle2()}>Close</Button>
                        }
                    </ModalHeader>
                    <ModalBody>
                        {!this.props.miniMessage &&
                            <div className="chatbox">
                                <div className="chatlogs">
                                    {this.printMessages(currentMessages)}
                                </div>
                                <div className="chat-form">
                                    <textarea id="messageBox" onChange={this.updateMessage}></textarea>
                                    <button onClick={this.submitMessage}>Send</button>
                                </div>
                            </div>
                        }
                        {this.props.miniMessage &&
                            <div className="chatbox">
                                <div className="chat-form">
                                    <textarea id="messageBox" className="mini" onChange={this.updateMessage}></textarea>
                                    <button onClick={this.submitMessage}>Send</button>
                                </div>
                            </div>
                        }
                    </ModalBody>
                </Modal>
            </div >
        )
    }
}

export default Conversation;