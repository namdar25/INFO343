import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import $ from 'jquery';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledCarousel } from 'reactstrap';




export class Conversation extends Component {
    constructor(props) {
        super(props)
        this.submitMessage = this.submitMessage.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = ({
            modal: props.modal,
            uid: props.uid,
            recieverUid: props.recieverUid,
            currentMessages: {}

        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        })
    }

    componentDidMount() {
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
        //$(".chatlogs").stop().animate({ scrollTop: $(".chatlogs")[0].scrollHeight }, 1000);
    }

    updateMessage(event) {
        this.setState({
            message: event.target.value
        })
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
        $(".chatlogs").stop().animate({ scrollTop: $(".chatlogs")[0].scrollHeight }, 1000);
        $('#messageBox').val('');

    }

    printMessages(currentMessages) {
        let output = Object.values(currentMessages).map((message, i) => {
            if (message.text !== undefined) {
                let person;
                if (message.sender === this.state.uid) {
                    person = 'chat self';
                } else {
                    person = 'chat friend';
                }
                if (message.text !== null) {
                    return (
                        <div class={person}>
                            <div class="user-photo"></div>
                            <p class='chat-message'>{message.text}</p>
                        </div>)
                }
            }
        })
        return output;
    }

    render() {
        let currentMessages = this.state.currentMessages;
        console.log(this.state.modal)
        return (
            <div>
                <div class="chatbox">
                    <div class="chatlogs">
                        {this.printMessages(currentMessages)}
                    </div>
                    <div class="chat-form">
                        <textarea id="messageBox" onChange={this.updateMessage}></textarea>
                        <button onClick={this.submitMessage}>Send</button>
                    </div>
                </div>
                {/* <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false} >
                    <ModalHeader>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalHeader>
                    <ModalBody>
                        <div class="chatbox">
                            <div class="chatlogs">
                                {this.printMessages(currentMessages)}
                            </div>
                            <div class="chat-form">
                                <textarea id="messageBox" onChange={this.updateMessage}></textarea>
                                <button onClick={this.submitMessage}>Send</button>
                            </div>
                        </div>
                    </ModalBody>
                </Modal> */}
            </div>
        )
    }
}

export default Conversation;