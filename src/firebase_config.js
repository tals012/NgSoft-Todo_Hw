import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyB-q0DgYPSqC9AK6DqmadUyh6EcxPzSuEw",
    authDomain: "todo-6a514.firebaseapp.com",
    projectId: "todo-6a514",
    storageBucket: "todo-6a514.appspot.com",
    messagingSenderId: "1086284376242",
    appId: "1:1086284376242:web:4c1ddaa6100a83b3b3c1ab"
  };

  firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
export { db };