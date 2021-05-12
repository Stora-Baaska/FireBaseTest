import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'


var firebaseConfig = {
    apiKey: "AIzaSyC35PYG9xbVwQWVZK-gS3SAOvRD88XCV8w",
    authDomain: "fir-tut-e8ec9.firebaseapp.com",
    projectId: "fir-tut-e8ec9",
    storageBucket: "fir-tut-e8ec9.appspot.com",
    messagingSenderId: "555644028581",
    appId: "1:555644028581:web:e38acbf8278d2b7cd2af4c",
    measurementId: "G-VMTXH3KNWT"
  };

if(!firebase.apps.length) firebase.initializeApp(firebaseConfig)


const auth  = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

export {auth,db,storage,serverTimestamp}

