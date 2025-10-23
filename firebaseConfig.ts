import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// --- IMPORTANT ---
// To connect your Firebase project, create a .env file in the root of this project
// and add your Firebase configuration like this:
//
// REACT_APP_FIREBASE_API_KEY="your-api-key"
// REACT_APP_FIREBASE_AUTH_DOMAIN="your-auth-domain"
// REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
// REACT_APP_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
// REACT_APP_FIREBASE_APP_ID="your-app-id"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Check if the necessary Firebase config keys are provided
export const isFirebaseConfigured = !!firebaseConfig.apiKey;
export const isGeminiConfigured = !!process.env.API_KEY;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log("Firebase connected successfully.");
  } catch (e) {
    console.error("Firebase initialization error:", e);
  }
} else {
  console.warn("Firebase is not configured. Please add your config to a .env file. The app will run in offline preview mode.");
}

if (!isGeminiConfigured) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

export { app, auth, db, storage };
