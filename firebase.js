// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
//
// export const firebaseConfig = {
//   apiKey: 'AIzaSyCSsiWdjI_zu4G88ZIQbFtypDLS3W1yrHU',
//   authDomain: 'project-8606414551952294422.firebaseapp.com',
//   projectId: 'project-8606414551952294422',
//   storageBucket: 'project-8606414551952294422.appspot.com',
//   messagingSenderId: '497282544556',
//   appId: '1:497282544556:web:b9c7d67a4354085557c009',
//   measurementId: 'G-WYHY25QQXC',
// };
//
// initializeApp(firebaseConfig);
//
// export const db = getFirestore(initializeApp(firebaseConfig));
// export const auth = getAuth();

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCSsiWdjI_zu4G88ZIQbFtypDLS3W1yrHU',
  authDomain: 'project-8606414551952294422.firebaseapp.com',
  projectId: 'project-8606414551952294422',
  storageBucket: 'project-8606414551952294422.appspot.com',
  messagingSenderId: '497282544556',
  appId: '1:497282544556:web:b9c7d67a4354085557c009',
  measurementId: 'G-WYHY25QQXC',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

export default firebase;
