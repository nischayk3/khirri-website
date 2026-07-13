import { initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const initializeFirebaseAdmin = () => {
  if (getApps().length === 0) {
    if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
    ) {
      const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      };
      return initializeApp({
        credential: cert(serviceAccount),
      });
    } else {
      // Vercel build phase fallback
      console.warn("Firebase Admin env variables missing. Initializing dummy app for build phase.");
      return initializeApp({ projectId: "dummy-project-id" });
    }
  }
  return getApp();
};

const app = initializeFirebaseAdmin();
export const db = getFirestore(app);
