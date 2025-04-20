import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBf1rEq5J2T-WQIOQxQJWyhLUhlLOoQEcw",
    authDomain: "ai-hackathon-8a527.firebaseapp.com",
    projectId: "ai-hackathon-8a527",
    storageBucket: "ai-hackathon-8a527.firebasestorage.app",
    messagingSenderId: "404576326677",
    appId: "1:404576326677:web:6a39f3e73c00561dff6a1c"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };