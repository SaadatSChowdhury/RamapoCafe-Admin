/**
  Firebase Configuration and Initialization
  
  NAME
  
      Firebase Configuration and Initialization - Initializes Firebase, Firestore, and Storage.
  
  SYNOPSIS
  
      import { initializeApp } from "firebase/app";
      import { getFirestore } from "firebase/firestore";
      import { getStorage } from "firebase/storage";
  
  DESCRIPTION
  
      This script initializes Firebase for the RamapoCafe application. It imports 
      the necessary Firebase modules, including Firestore (for database operations)
      and Storage (for file storage operations).
  
      The `firebaseConfig` object holds the configuration details for the Firebase 
      project, including the API key, project ID, and other critical identifiers.
  
      The `initializeApp` function initializes the Firebase application with the 
      provided configuration. `getFirestore` and `getStorage` are then used to 
      initialize Firestore and Storage services respectively, which are essential 
      for database and storage operations within the app.
  
  USAGE
  
      The initialized `db` (Firestore instance) and `storage` (Firebase Storage instance) 
      are exported and can be imported into other modules wherever Firestore and Storage 
      functionalities are required.
  
  EXPORTS
  
      Exports `db` for Firestore operations and `storage` for Firebase Storage operations.
 */


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWElGqz_IOJyWRkrBca8JiEz-pvTOL9Ag",
  authDomain: "ramapocafe-66bcb.firebaseapp.com",
  projectId: "ramapocafe-66bcb",
  storageBucket: "ramapocafe-66bcb.appspot.com",
  messagingSenderId: "194291766349",
  appId: "1:194291766349:web:08ce7bfd20a09148bab804"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage};