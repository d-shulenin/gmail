import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD5dMTmbFjWv6ueX5ZwurZ1nU8HeqLo89g",
    authDomain: "fir-1c356.firebaseapp.com",
    projectId: "fir-1c356",
    storageBucket: "fir-1c356.appspot.com",
    messagingSenderId: "16999163271",
    appId: "1:16999163271:web:063c4b078ae083c651df22"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export { auth, db }


