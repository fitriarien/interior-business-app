// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXgDwYTzlvDmIltmfHVPTBWqc9LELv744",
  authDomain: "instudio-dc36b.firebaseapp.com",
  projectId: "instudio-dc36b",
  storageBucket: "instudio-dc36b.appspot.com",
  messagingSenderId: "646172851038",
  appId: "1:646172851038:web:bcc7619ceb55464908edcf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);