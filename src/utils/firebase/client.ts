// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyC8U9nnEgC7gdp8-nfY_XXmPaD8YfUrtoQ",
  authDomain: "drones-crm.firebaseapp.com",
  projectId: "drones-crm",
  storageBucket: "drones-crm.appspot.com",
  messagingSenderId: "1024181551324",
  appId: "1:1024181551324:web:6d2d31ab0363a151e7b419",
  measurementId: "G-NHX2M84DMG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);