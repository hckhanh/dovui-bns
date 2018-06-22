import firebase from 'firebase/app'
import 'firebase/functions'

firebase.initializeApp({
  apiKey: 'AIzaSyDx-OOLvl-lEfCOjO5An5xujli56VFz2sg',
  authDomain: 'dovui-bns.firebaseapp.com',
  databaseURL: 'https://dovui-bns.firebaseio.com',
  projectId: 'dovui-bns',
  storageBucket: 'dovui-bns.appspot.com',
  messagingSenderId: '214222333337'
})

// Initialize Cloud Functions through Firebase
const functions = firebase.functions()

const getQuizzes = functions.httpsCallable('getQuizzes')
const newQuiz = functions.httpsCallable('newQuiz')

export { getQuizzes, newQuiz }
