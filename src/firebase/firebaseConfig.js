// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqfk83tu0t1yIYhkPYmXK8rXTjaKsmoBk",
    authDomain: "react-app-cursos-aacb4.firebaseapp.com",
    projectId: "react-app-cursos-aacb4",
    storageBucket: "react-app-cursos-aacb4.appspot.com",
    messagingSenderId: "641662870408",
    appId: "1:641662870408:web:673f0e7d6ae2651bcd903d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export{
    db,
    googleAuthProvider,
    firebase
}