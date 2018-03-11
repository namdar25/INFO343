import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyCg0NK0JvgjlU8pHF_kNxLnx_To1NhogNg",
  authDomain: "subuw-j420m.firebaseapp.com",
  databaseURL: "https://subuw-j420m.firebaseio.com",
  projectId: "subuw-j420m",
  storageBucket: "subuw-j420m.appspot.com",
  messagingSenderId: "525275022235"
};
firebase.initializeApp(config);
export default firebase;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
