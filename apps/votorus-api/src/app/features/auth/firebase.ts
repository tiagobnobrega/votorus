import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCwhuvqEBwsrEpCZVuNc1h8l_tLyJvM3OM',
  authDomain: 'votorus.firebaseapp.com',
  projectId: 'votorus',
  storageBucket: 'votorus.appspot.com',
  messagingSenderId: '648252782699',
  appId: '1:648252782699:web:5f6c4c99f6c09372d1d92e',
  measurementId: 'G-DK1STGECRG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
