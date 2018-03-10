import React, { Component } from 'react'
import { render } from 'react-dom'
import { Launcher } from 'react-chat-window';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

class ChatWindow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageList: props.messageList
        };
    }

    _onMessageWasSent(message) {
        this.setState({
            messageList: [...this.state.messageList, message]
        })
    }

    _sendMessage(text) {
        // if (text.length > 0) {
        //     let message = {
        //         author: 'them',
        //         type: 'text',
        //         data: { text }
        //     };
        //     this.setState({
        //         messageList: [...this.state.messageList, message]
        //     })
        //     let conversation = firebase.database().ref('conversations/' + this.props.chatId);
        //     conversation.push(message);
        // }
    }

    render() {
        console.log(this.props.messageList)
        console.log(this.props.children)
        console.log(this.state.messageList)
        return (<div>
            <Launcher
                agentProfile={{
                    teamName: 'react-live-chat',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={this._onMessageWasSent.bind(this)}
                sendMessage={this._sendMessage.bind(this)}
                messageList={this.props.messageList}
                showEmoji
            />
        </div>)
    }
}

export default ChatWindow;
