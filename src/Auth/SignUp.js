import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, setDoc, doc, Timestamp } from "firebase/firestore";

export const SignUp = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  });
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const { name, email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      localStorage.setItem("token", result.user.accessToken);
      navigate("/home");
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  return (
    <div className="wrap">
      <div className="form-section">
        <div className="signup-form form">
          <h5>Create new Account</h5>
          <div className="form-group mb-2">
            <input
              type="text"
              placeholder="name"
              className="form-control"
              onChange={handleChange}
              name="name"
              value={name}
            />
          </div>

          <div className="form-group mb-2">
            <input
              type="text"
              placeholder="email"
              className="form-control"
              onChange={handleChange}
              name="email"
              value={email}
            />
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={handleChange}
              name="password"
              value={password}
            />
          </div>
          {error ? <p className="text-center text-danger">{error}</p> : null}

          <button
            className="add btn btn-success d-flex"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? "creating" : "Register"}
          </button>
          <p className="acount">
            If already have acount
            <Link to="/login">
              <span className="already">Login</span>
            </Link>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};
