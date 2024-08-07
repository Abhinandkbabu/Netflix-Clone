import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC7uxIp5znie9l5zPS7HSg-Y_wRs1m0EeI",
  authDomain: "netflix-clone-cbcf6.firebaseapp.com",
  projectId: "netflix-clone-cbcf6",
  storageBucket: "netflix-clone-cbcf6.appspot.com",
  messagingSenderId: "483037649096",
  appId: "1:483037649096:web:5fdd4dc6aefb879af0edfd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid : user.uid,
            name,
            authProvider : "local",
            email,
        });
    }catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = ()=>{
     signOut(auth);
}

export {auth, db, login , signup, logout}