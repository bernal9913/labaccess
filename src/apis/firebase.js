// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALUUvsANO_XFPYvWIJ_cUeZV6ZMhwpLt4",
    authDomain: "animal-crossing-4c5da.firebaseapp.com",
    databaseURL: "https://animal-crossing-4c5da-default-rtdb.firebaseio.com",
    projectId: "animal-crossing-4c5da",
    storageBucket: "animal-crossing-4c5da.appspot.com",
    messagingSenderId: "635945032624",
    appId: "1:635945032624:web:c583341c14a8a1ae731475",
    measurementId: "G-8FBJTZPCMS"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase)
const storage = getStorage(firebase)

export { db, storage }