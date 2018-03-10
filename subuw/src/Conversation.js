import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import $ from 'jquery';


class Conversation extends Component {
    constructor(props) {
        super(props)
        this.submitMessage = this.submitMessage.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.state = ({
            uid: "me",
            recieverUid: "them",
            currentMessages: {}

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
            chats.once('value', function (snapshot) {
                front = snapshot.hasChild(uid + "-" + recieverUid);
                back = snapshot.hasChild(recieverUid + "-" + uid);
                console.log(front, back)
                if (!front && !back) {
                    console.log(snapshot)
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
            console.log(firebase.database().ref('conversations/' + child))
        }
    }

    updateMessage(event) {
        this.setState({
            message: event.target.value
        })
    }

    submitMessage(event) {
        event.preventDefault()
        const nextMessage = this.state.message;
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
        $('#messageBox').val('');
    }

    printMessages(currentMessages) {
        let output = Object.values(currentMessages).map((message, i) => {
            if (message.text !== undefined) {
                let bubble;
                if (message.sender === this.state.uid) {
                    bubble = '';
                } else {
                    bubble = '';
                }
                if (message.text !== null) {
                    return (
                        <div>
                            <div className={bubble}>
                                <div class="talktext">
                                    <p>{message.text}</p>
                                </div>
                            </div>
                            <br className="chat" />
                        </div>
                    )
                }
            }
        })
        return output;
    }

    render() {
        let currentMessages = this.state.currentMessages;
        return (
            <div>
                <h2>Conversation</h2>
                <ul className="allMessages">
                    {this.printMessages(currentMessages)}
                </ul>
                <form className="messageForm" onSubmit={this.submitMessage}>
                    <input id="messageBox" className="messageBox" onChange={this.updateMessage} maxlength='34' name="input" type="text" placeholder="Message" />
                </form>
                <a href="#" class="open-btn" id="addClass"><i class="fa fa-whatsapp" aria-hidden="true"></i> Click Here</a>
            </div>


        )
    }
}

export default Conversation;