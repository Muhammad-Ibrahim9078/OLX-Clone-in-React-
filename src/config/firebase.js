import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyClUj8OZbs_rHI_nj10cmUeorLB_XLV6H8",
  authDomain: "project-5211b.firebaseapp.com",
  projectId: "project-5211b",
  storageBucket: "project-5211b.firebasestorage.app",
  messagingSenderId: "934446735313",
  appId: "1:934446735313:web:629c9f306e0bd974e08af0",
  measurementId: "G-EV0G3ZNCHS"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
