import { initializeApp, getApps, getApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
// To test with Firebase emulators locally, also import `connectFunctionsEmulator`
// from "firebase/functions" and call it on `functions` below.

// Replace these with your actual Firebase config keys
// You can find these in the Firebase Console -> Project Settings
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "jinwoong-shin-portfolio.firebaseapp.com",
    projectId: "jinwoong-shin-portfolio",
    storageBucket: "jinwoong-shin-portfolio.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const functions = getFunctions(app, "us-central1");

export { app, functions };
