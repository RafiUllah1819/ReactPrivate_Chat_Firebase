import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        navigate("/login");
        console.log("logout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav>
      <h4>
        <Link to="/home" className="nav-link">
          Messenger
        </Link>
      </h4>
      {/* <div className="d-flex">
        <Link to="/" className="nav-link">
          Register
        </Link>
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </div> */}
      <div className="logout">
        <button onClick={logout}> Logout</button>
      </div>
    </nav>
  );
};
