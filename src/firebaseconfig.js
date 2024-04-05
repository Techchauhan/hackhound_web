import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMm2OIh5ofHJKGmQludKEEcTYW81f3hIo",
    authDomain: "banking-2cdb4.firebaseapp.com",
    projectId: "banking-2cdb4",
    storageBucket: "banking-2cdb4.appspot.com",
    messagingSenderId: "953004495635",
    appId: "1:953004495635:web:8c15cac20e9391f9c240e6",
    measurementId: "G-60S20Z8XG8"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Get Auth instance
const auth = getAuth(app);

export { app, db, auth };
