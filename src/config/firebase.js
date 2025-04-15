import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// Parse service account JSON from the environment variable
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "book-app-3eb7b.appspot.com",
});

// Export bucket for use in your code
const bucket = getStorage().bucket();
export { bucket };