// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZmvpccNMgcYFQl1_jcsmiyZGcI4pryrc",
  authDomain: "user-email-password-auth-258d1.firebaseapp.com",
  projectId: "user-email-password-auth-258d1",
  storageBucket: "user-email-password-auth-258d1.firebasestorage.app",
  messagingSenderId: "314117593162",
  appId: "1:314117593162:web:bec2f228ce4a3720002eb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;