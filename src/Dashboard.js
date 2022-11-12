import { auth, db,logout } from "./firebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";

import "./Dashboard.css";

function Dashboard() {
    const [user,loading, err] = useAuthState(auth);
    const [name, setName] = useState("");
    const nav = useNavigate();

    const fetchData = async () =>{
    try{
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data()
      setName(data.name);
    }catch(err){
        alert("error occured while fetching data!")
    }
    };

    useEffect(() =>{
        if(loading) return;
        if(!user) return nav("/")

        fetchData()
    },[user,loading])

    return(
        <div className="dashboard">
        <div className="dashboard__container">
          Logged in as
          <div>{name}</div>
          <div>{user?.email}</div>
          <button className="dashboard__btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    );
}

export default Dashboard;
