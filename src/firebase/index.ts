// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import * as Firestore from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsWCOyedzY3el0byJVpw0nKQhAFnh7cOw",
  authDomain: "the-bimdesk.firebaseapp.com",
  projectId: "the-bimdesk",
  storageBucket: "the-bimdesk.firebasestorage.app",
  messagingSenderId: "913617705752",
  appId: "1:913617705752:web:b69a52e3ccfc1125e01c6d",
  measurementId: "G-KHWHSF08QX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 
export const firebaseDB = Firestore.getFirestore();

export function getCollection<T>(path: string){
    return Firestore.collection(firebaseDB, path) as Firestore.CollectionReference<T>;
}

// export async function getDocument(path: string, id: string) {
//     const docRef = Firestore.doc(firebaseDB, `${path}/${id}`);
//     console.log(docRef);
//     return docRef
// }
export async function deleteDocument(path: string, id: string) {
    const docRef = Firestore.doc(firebaseDB, `${path}/${id}`);
    console.log(`Project with id: ${id} deleted from Firestore`);
    await Firestore.deleteDoc(docRef);
}
export async function updateDocument<T extends Record<string,any>>(path: string, id: string, data: T) {
    const docRef = Firestore.doc(firebaseDB, `${path}/${id}`);
    console.log(`Project with id: ${id} deleted from Firestore`);
    await Firestore.updateDoc(docRef,data);
}