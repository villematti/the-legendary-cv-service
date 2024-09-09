import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const {
  NEXT_FIREBASE_API_KEY,
  NEXT_FIREBASE_AUTH_DOMAIN,
  NEXT_FIREBASE_PROJECT_ID,
  NEXT_FIREBASE_STORAGE_BUCKET,
  NEXT_FIREBASE_MESSAGINGSENDER_ID,
  NEXT_FIREBASE_APP_ID,
  NEXT_FIRABASE_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: NEXT_FIREBASE_API_KEY,
  authDomain: NEXT_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_FIREBASE_MESSAGINGSENDER_ID,
  appId: NEXT_FIREBASE_APP_ID,
  measurementId: NEXT_FIRABASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const analytics =
  app.name && typeof window !== "undefined" ? getAnalytics(app) : null;
const db = getFirestore(app);

export { app, analytics, auth, db };
