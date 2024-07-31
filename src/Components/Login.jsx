import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      setUser(response.data);
      setRedirect(true);
      alert("Logged in  succcesfully");
    } catch (e) {
      alert("Login failed" + e);
    }
  }

  if (redirect) {
    return <Navigate to="/home"></Navigate>;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-center text-xl font-bold mb-4">Login</h1>
        <form className="max-w-md mx-auto gap-10">
          <input
            type="email"
            placeholder="you@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button className="primary" onClick={login}>
            Login
          </button>

          <div className="text-center py-2">
            Don't have an accout yet ?{" "}
            <Link className="underline text-black " to={"/"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
