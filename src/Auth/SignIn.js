import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export const SignIn = () => {
  const navigate = useNavigate();
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
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "users", result.user.uid), {
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
            {loading ? "Logging" : "Login"}
          </button>
          <p className="acount">
            If don't already have acount
            <Link to="/">
              <span className="already">Register</span>
            </Link>
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );
};
