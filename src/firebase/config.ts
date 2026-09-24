import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';

/**
 * Firebase Configuration with placeholders as requested.
 * Replace with your real Firebase Project credentials from Firebase Console.
 */
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};

// Check if Firebase credentials have been configured with real values
export const isFirebaseConfigured = (): boolean => {
  return (
    firebaseConfig.apiKey !== "YOUR_API_KEY" &&
    firebaseConfig.apiKey.length > 5 &&
    firebaseConfig.projectId !== "YOUR_PROJECT_ID"
  );
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let database: Database | null = null;

try {
  if (isFirebaseConfigured()) {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    database = getDatabase(app);
  }
} catch (error) {
  console.warn("Firebase initialization skipped or failed (using fallback store):", error);
}

export { app, auth, database };
