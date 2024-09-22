import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC2fxfq35BnfDZ-liwKQYqtXDV3lfH4e_g",
  authDomain: "interviewcode-99e71.firebaseapp.com",
  projectId: "interviewcode-99e71",
  storageBucket: "interviewcode-99e71.appspot.com",
  messagingSenderId: "508942294298",
  appId: "1:508942294298:web:d326f19077780516bb60a3",
  databaseURL:"https://interviewcode-99e71-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {app,auth,db};
