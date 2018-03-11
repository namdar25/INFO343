import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './Chat.js';
import AddListing from './AddListing.js';
import Conversation from './Conversation.js';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';


class App extends Component {

  constructor(props) {
    super(props)
    this.getMyConversations = this.getMyConversations.bind(this);
    this.showConvo = this.showConvo.bind(this);
    this.state = ({
      uid: "jon",
      allConversations: {},
      showConvo: false
    })
  }

  componentDidMount() {
    firebase.database().ref('conversations/').on('value', (snapshot) => {
      const allConversations = snapshot.val()
      if (allConversations != null) {
        this.setState({
          allConversations: allConversations,
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

  render() {
    let myConversations = this.getMyConversations();
    console.log(myConversations)
    let uid = this.state.uid;
    console.log(this.state.showConvo)
    return (
      <div className="App">
        <Router>
          <div>
            {!this.state.showConvo &&
              <div>
                <Link to="/chat"> Chat </Link>
                <Route path="/chat" render={(props) => (
                  <Chat myConversations={myConversations} showConvo={this.showConvo} uid={this.state.uid} />
                )} />
              </div>
            }
            {this.state.showConvo &&
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
            }
          </div>
        </Router>
      </div >
    )
  }
}

export default App;
