import React, { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { ChatHome } from "../Pages/ChatHome";

export const Home = () => {
  const [user, setUser] = useState();
  // useEffect(() => {
  //   const docRef = doc(db, "users", auth.currentUser?.uid);
  //   const docSnap = getDoc(docRef);
  //   console.log("docsnap", docSnap);
  //   if (docSnap.exists) {
  //     setUser(docSnap.data());
  //   } else {
  //     console.log("no document");
  //   }
  // }, []);
  return (
    <div>
      <ChatHome />
    </div>
  );
};
