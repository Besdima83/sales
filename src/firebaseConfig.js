import firebase from "firebase/firebase";

firebase.initializeApp({
    apiKey: "AIzaSyBBHsdt4o3euPPCZYB9UamCwkkVZFU69qo",
    authDomain: "sales-107b3.firebaseapp.com",
    projectId: "sales-107b3",
    storageBucket: "sales-107b3.appspot.com",
    messagingSenderId: "704354326227",
    appId: "1:704354326227:web:731c4b9aeb98a0f32b6626"
})

const db = firebase.firestore()
export default db

