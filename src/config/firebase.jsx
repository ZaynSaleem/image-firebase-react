import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDTqBEOXq-ep9au-zE_Pc8PQqrL9OFStbs",
    authDomain: "todoauth-28dbc.firebaseapp.com",
    databaseURL: "gs://todoauth-28dbc.appspot.com/",
    projectId: "todoauth-28dbc",
    storageBucket: "todoauth-28dbc.appspot.com",
    messagingSenderId: "891339908435",
    appId: "1:891339908435:web:d2ca727a91203369c6eda6",
    measurementId: "G-78MNTM3Z4X"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore();

export default firebase;


