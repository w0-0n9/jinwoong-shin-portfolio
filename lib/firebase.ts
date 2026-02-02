import { initializeApp, getApps, getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

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

// Connect to emulator if running locally
// Uncomment the line below to test comfortably with emulators
// connectFunctionsEmulator(functions, "127.0.0.1", 5001);

export { app, functions };
