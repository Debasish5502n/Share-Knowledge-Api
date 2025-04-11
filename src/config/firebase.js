// firebase.js
import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load service account JSON
const serviceAccountPath = path.join(__dirname, "service-account.json");
const serviceAccountJSON = JSON.parse(await readFile(serviceAccountPath, "utf-8"));

// Initialize Firebase
initializeApp({
  credential: cert(serviceAccountJSON),
  storageBucket: "book-app-3eb7b.appspot.com",
});

// Export bucket
const bucket = getStorage().bucket();

export { bucket };