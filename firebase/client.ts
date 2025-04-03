import {initializeApp, getApps, getApp} from 'firebase/app';
import{getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBvrnHGCdXa612TVnErGo_M7zrRr8kTJX4",
    authDomain: "shinebright-9a31b.firebaseapp.com",
    projectId: "shinebright-9a31b",
    storageBucket: "shinebright-9a31b.firebasestorage.app",
    messagingSenderId: "919554768218",
    appId: "1:919554768218:web:347f4bbb1591c42c5b8763",
    measurementId: "G-VG8C39SF9S"
};

// Initialize Firebase
const app = !getApps.length?initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db= getFirestore(app);