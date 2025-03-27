// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzq-f8k6Ul2TnG7qGM-Trnufx-pzXEHj4",
  authDomain: "clubs-39030.firebaseapp.com",
  projectId: "clubs-39030",
  storageBucket: "clubs-39030.appspot.com", // fixed the typo
  messagingSenderId: "209554226350",
  appId: "1:209554226350:web:b65b5185f413efec31c13f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
