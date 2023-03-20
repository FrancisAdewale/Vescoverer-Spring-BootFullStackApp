import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyDHVg1hRQJ4jYVVivKm5Ux2acSdmgIOPgo",
  authDomain: "vescoverer-fullstack.firebaseapp.com",
  projectId: "vescoverer-fullstack",
  storageBucket: "vescoverer-fullstack.appspot.com",
  messagingSenderId: "947614404970",
  appId: "1:947614404970:web:57a7bebf9f69197ac81513"
};


firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore()
var storage = firebase.storage()
var provider = new firebase.auth.GoogleAuthProvider(); 

export {auth , provider, db, storage};