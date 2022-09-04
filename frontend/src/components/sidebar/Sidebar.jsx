import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css"
export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="https://st2.depositphotos.com/3591429/5245/i/600/depositphotos_52453715-stock-photo-hands-holding-word-welcome.jpg" alt="" />
        <p>
          Welcome to our blog website community. Feel free to share your blogs here.
        </p>
      </div>
      <div className="sidebarItem">
      <span className="sidebarTitle">CATEGORIES</span>
      <ul className="sidebarList">
      {cats.map((c) => (
        <Link to={`/?cat=${c.name}`} className="link">
        <li className="sidebarListItem">{c.name}</li>
        </Link>
      ))}
      </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
        </div>
    </div>
  );
}
