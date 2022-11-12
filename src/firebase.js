import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    sendPasswordResetEmail
} from "firebase/auth";

import{
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAcsguGqmipHKaKu8QJGl_Afy_NBI8QnYw",
    authDomain: "firbase-test-190f6.firebaseapp.com",
    projectId: "firbase-test-190f6",
    storageBucket: "firbase-test-190f6.appspot.com",
    messagingSenderId: "80410887647",
    appId: "1:80410887647:web:4163784959e04d7ba4b06a"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth =  getAuth(app);
  const db = getFirestore(app);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try{
        const res =  await signInWithPopup(auth,googleProvider);
        const user =  res.user
        const q = query(collection(db,"users"),where("uuid","==",user.uid));
        const docs = await getDocs(q);
        if(docs.docs.length === 0){
            await addDoc(collection(db,"users"),{
                uuid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email
            });
        }
    }catch(err){
        alert(err.message)
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };


  const logout = () => {
    signOut(auth);
  };

  export {
    auth,
    db,
    signInWithGoogle,
    logout,
    registerWithEmailAndPassword,
    logInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendPasswordReset
  };