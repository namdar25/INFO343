import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase'
import 'bootstrap/dist/css/bootstrap.css'
import 'firebase/auth';
import 'firebase/database';
import { HashRouter, Route, Link } from "react-router-dom";
import { StartPage } from './StartPage';
import { About } from './About';

let config = {
    apiKey: "AIzaSyCg0NK0JvgjlU8pHF_kNxLnx_To1NhogNg",
    authDomain: "subuw-j420m.firebaseapp.com",
    databaseURL: "https://subuw-j420m.firebaseio.com",
    projectId: "subuw-j420m",
    storageBucket: "subuw-j420m.appspot.com",
    messagingSenderId: "525275022235"
};

firebase.initializeApp(config);
// export const provider = new firebase.auth.GoogleAuthProvider();
// export const auth = firebase.auth();

export default firebase;

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
