import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

// Decode base64 string from env
const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8')
);

// Initialize Firebase App
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'book-app-3eb7b.appspot.com', // Replace with your actual bucket name
});

// Access Firebase Storage bucket
const bucket = getStorage().bucket();

export { bucket };
