import { Firestore } from "@google-cloud/firestore";

let firestore: Firestore | undefined;

export function getFirestore() {
  firestore ??= new Firestore();

  return firestore;
}
