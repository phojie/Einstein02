import * as firebase from 'firebase/app'
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDj_LP5qQQjWNA3LQ6D2ojl9GURZXQq-rk',
  authDomain: 'grading-system-54611.firebaseapp.com',
  databaseURL: 'https://grading-system-54611.firebaseio.com',
  projectId: 'grading-system-54611',
  storageBucket: 'grading-system-54611.appspot.com',
  messagingSenderId: '1054810442313',
  appId: '1:1054810442313:web:f169b9c4fa77311d540d98',
  measurementId: 'G-YQJYXH3QFE'
}
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)
// let firebaseAuth = firebaseApp.auth()
let fireDB = firebaseApp.firestore()
let rdb = firebaseApp.database()
let fireStorage = firebaseApp.storage()
let fireAuth = firebaseApp.auth()

export { fireDB, rdb, fireStorage, fireAuth, firebase }
