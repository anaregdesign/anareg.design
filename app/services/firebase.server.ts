import admin from "firebase-admin";

if (!admin.apps.length) {
  // FIREBASE_SERVICE_ACCOUNT is a base64 encoded JSON string
  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set");
  }
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT, "base64").toString("utf8")
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const firestore = admin.firestore();
