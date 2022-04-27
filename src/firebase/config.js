import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBSU5WsLOEmgxCen7ZsYB1O_23ANikhE9M",
  authDomain: "my-money-d0743.firebaseapp.com",
  projectId: "my-money-d0743",
  storageBucket: "my-money-d0743.appspot.com",
  messagingSenderId: "333339730532",
  appId: "1:333339730532:web:7bd1266114796ef51bb571",
};

//init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp };
