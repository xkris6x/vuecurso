import firebase from 'firebase/app';

import "firebase/firestore";

const config = firebase.initializeApp({
    apiKey: "AIzaSyDcfK_yRoL4SbU3dTIEKDuzoXwm4esUTto",
    authDomain: "curso-vue-d6279.firebaseapp.com",
    databaseURL: "https://curso-vue-d6279.firebaseio.com",
    projectId: "curso-vue-d6279",
    storageBucket: "curso-vue-d6279.appspot.com",
    messagingSenderId: "158400874433"
});

export const db = config.firestore()
