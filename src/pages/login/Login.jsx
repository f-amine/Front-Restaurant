import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/v1/auth/authenticate", {
        email: email,
        password: password,
      });
      console.log(response.data);
      Cookies.set("jwt", response.data); // store token in cookie
      history.push("/"); 
      window.location.reload();// redirect to home page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" type="submit">
          Login
        </button>
      </form>
      <button className="loginRegisterButton">Register</button>
    </div>
  );
}