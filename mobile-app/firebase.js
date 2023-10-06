// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDZHPKqV7REcSmPst0rLoJxEuItHKbUp1U',
  authDomain: 'csse-b8ce3.firebaseapp.com',
  projectId: 'csse-b8ce3',
  storageBucket: 'csse-b8ce3.appspot.com',
  messagingSenderId: '397395363693',
  appId: '1:397395363693:web:2451bd2c097dc4f69c3c64',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// Initialize Firestore
const FireStore = getFirestore(app);

export { auth, FireStore };
