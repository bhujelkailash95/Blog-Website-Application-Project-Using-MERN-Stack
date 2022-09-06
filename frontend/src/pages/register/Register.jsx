import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [data,setData] = useState({
    username:"",
    email:"",
    password:""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({currentTarget:input}) =>{
    setData({
      ...data,[input.name]:input.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/register";
      const { data:response } = await axios.post(url, data);
      console.log(response.message);
      navigate("/login");
    } catch (error) {
      if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			)
        {
          setError(error.response.data.message);
        }
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          required
          name="username"
          value={data.username}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          required
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          required
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        {error && <div className='error-msg'>{error}</div>}
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
