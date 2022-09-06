import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

export default function Login() {
  const [data, setData] = useState({ username: "", password: ""});
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState("");

  const handleChange = ({currentTarget: input}) => {
    setData({...data, [input.name]:input.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value
      });
            sessionStorage.setItem('accessToken', `Bearer ${res.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${res.data.refreshToken}`);
            console.log(res.data)
            
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" ,})
      if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.msg);
        dispatch({ type: "LOGIN_FAILURE"});
			}
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your username..."
          ref={userRef}
          name="username"
          value={data.username}
          onChange={handleChange}
          required
        />
        
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter your password..."
          ref={passwordRef}
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
        {error && <div className='error-msg'>{error}</div>}
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
