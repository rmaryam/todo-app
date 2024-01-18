import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQLnDMZ42fT9bM82_QDmBjSbtHurP9kFk",
    authDomain: "todo-app-4a476.firebaseapp.com",
    projectId: "todo-app-4a476",
    storageBucket: "todo-app-4a476.appspot.com",
    messagingSenderId: "781126827903",
    appId: "1:781126827903:web:732bddbe69dec29e33a44a",
    measurementId: "G-5HGF399TEG"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);  

const db = firebaseApp.firestore();

export { db };