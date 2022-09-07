import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./login.css";

//Icon Dependencies
import { Icon } from 'react-icons-kit'
import {eye} from 'react-icons-kit/feather/eye'
import {eyeOff} from 'react-icons-kit/feather/eyeOff'

export default function Login() {
  const [data, setData] = useState({ username: "", password: ""});
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState("");
  const [type, setType]=useState('password');
  const [icon, setIcon]=useState(eyeOff);

  const handleToggle=()=>{    
    if(type==='password'){
      setIcon(eye);      
      setType('text');
    }
    else{
      setIcon(eyeOff);     
      setType('password');
    }
  }


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
        <div className="input-field">
        <input
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
          name="username"
          value={data.username}
          onChange={handleChange}
          required
        />
        </div>

        <label>Password</label>
        <div className="input-field">
        <input
          type={type}
          placeholder="Enter your password..."
          ref={passwordRef}
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <span onClick={handleToggle}><Icon icon={icon} size={25}/></span>
        </div>
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
