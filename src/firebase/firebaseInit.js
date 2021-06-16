import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAVuznhIn--O1sVPF5LhdFs0yqXPM3zHvI',
  authDomain: 'fireblogs-9a966.firebaseapp.com',
  projectId: 'fireblogs-9a966',
  storageBucket: 'fireblogs-9a966.appspot.com',
  messagingSenderId: '539709133135',
  appId: '1:539709133135:web:390a90bf5f8edf0430f53a',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
