import "./register.css"
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // Import useHistory
import RestaurantMap from "../../components/map/RestaurantMap";
export default function Register() {
  const history = useHistory(); // Initialize useHistory
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [latlng, setLatLng] = useState({});
  function handleChildValue(newValue) {
    setLatLng(newValue);
    console.log(newValue);
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8081/api/v1/auth/register", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        longitude: latlng.lng,
        latitude: latlng.lat,
      });
      console.log(response.data);
      history.push("/login"); // Redirect to the login page

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your first name..."
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last Name</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your last name..."
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <RestaurantMap onValueChange={handleChildValue}/>
      <button className="registerLoginButton">Login</button>
    </div>
  );
}