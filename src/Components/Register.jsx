import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registeruser(e) {
    e.preventDefault();

    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      setName("");
      setEmail("");
      setPassword("");
      alert("Registration successfull . You can log in now");
      // console.log(response.data);
    } catch (e) {
      alert("Registrtaion failed" + e);
    }
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-center text-xl font-bold mb-4">
          Welcome to Workflo!
        </h1>
        <form className="max-w-md mx-auto gap-10 ">
          <input
            type="text"
            placeholder="john doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button className="primary" onClick={registeruser}>
            {" "}
            Register
          </button>

          <div className="text-center py-2">
            Already a member ?
            <Link className="underline text-black " to={"/login"}>
              login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
