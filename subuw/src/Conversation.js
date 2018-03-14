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
        if (this.props.modal) {
            let front;
            let back;
            let chats = firebase.database().ref('conversations/');
            let uid = this.state.uid;
            let recieverUid = this.state.recieverUid;
            console.log(uid, recieverUid)
            if (uid !== recieverUid) {
                chats.on('value', function (snapshot) { //only goes in here for first set up, I want to go in every time a messaged is added(seems to skip it)
                    front = snapshot.hasChild(uid + "-" + recieverUid);
                    back = snapshot.hasChild(recieverUid + "-" + uid);
                    console.log(front, back)
                    console.log(!front || !back)
                    if (!front && !back) {
                        console.log(snapshot)
                        chats.child(uid + '-' + recieverUid).set({
                            contributors: [uid, recieverUid]
                        })
                        front = true;
                        console.log(front, back)
                    }
                });
                console.log(front, back)
                let child;
                if (front) {
                    child = this.state.uid + "-" + this.state.recieverUid;
                } else {
                    child = this.state.recieverUid + "-" + this.state.uid;
                }
                console.log(child)
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
            console.log(this.state.chatId)
            //console.log($('.chatlogs')[0].scrollHeight)
            if ($(".chatlogs")[0] !== undefined) {
                $(".chatlogs").stop().animate({ scrollTop: $(".chatlogs")[0].scrollHeight * 40 }, 100);
            }
        }
        //$('.chatlogs').scrollTop(450);
        // $('.chatlogs').scrollTop($('.chatlogs').prop("scrollHeight"));
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
        console.log(this.state.chatId)
        if (nextMessage != '') {
            let message = {
                sender: this.state.uid,
                text: nextMessage
            }
            let conversation = firebase.database().ref('conversations/' + this.state.chatId);
            console.log(conversation, message)
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
                console.log(this.state.users)
                if (message.text !== null) {

                    return (
                        <div>
                            {!img &&
                                <div class={person}>
                                    <div class="user-photo"></div>
                                    <p class='chat-message'>{message.text}</p>
                                </div>
                            }
                            {img &&
                                <div class={person}>
                                    <div class="user-photo"><img src={img} alt={"Profile Picture of"} /> </div>
                                    <p class='chat-message'>{message.text}</p>
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
        console.log(this.state.modal, this.props.modal)
        console.log(this.state.uid, this.state.recieverUid)
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
                            <div class="chatbox">
                                <div class="chatlogs">
                                    {this.printMessages(currentMessages)}
                                </div>
                                <div class="chat-form">
                                    <textarea id="messageBox" onChange={this.updateMessage}></textarea>
                                    <button onClick={this.submitMessage}>Send</button>
                                </div>
                            </div>
                        }
                        {this.props.miniMessage &&
                            <div class="chatbox">
                                <div class="chat-form">
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