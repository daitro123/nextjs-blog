import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyC88L2BIVkgxZZtMWvDmR0_iIimWOZGWg8",
    authDomain: "nextjs-test-a94b6.firebaseapp.com",
    projectId: "nextjs-test-a94b6",
    storageBucket: "nextjs-test-a94b6.appspot.com",
    messagingSenderId: "672140052623",
    appId: "1:672140052623:web:720d0413eda82eb1ed48fa",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
