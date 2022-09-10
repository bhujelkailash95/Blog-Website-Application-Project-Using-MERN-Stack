import React, { useContext} from 'react';
import Topbar from './components/topbar/topbar';
import Home from './pages/homepage/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Settings from './pages/settings/Settings';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Context} from './context/Context';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';

function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/posts' element={<Home />} />
        <Route path='/register' element={user ? <Home /> : <Register />} />
        <Route path='/login' element={user ? <Home/> : <Login />} />
        <Route path='/post/:id' element={<Single />} />
        <Route path='/write' element={user ? <Write /> : <Login />} />
        <Route path='/settings' element={user ? <Settings /> : <Login />} />
        <Route path='/single' element={<Single />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
