// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxgehMkKM45pqCYn8YyXulyzCZz6c8JFU",
  authDomain: "instudio2.firebaseapp.com",
  projectId: "instudio2",
  storageBucket: "instudio2.appspot.com",
  messagingSenderId: "515791087233",
  appId: "1:515791087233:web:ac3667b4ab3eaf04114f80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);