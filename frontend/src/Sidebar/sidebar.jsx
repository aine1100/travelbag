import { useState, useEffect } from 'react';
import './sidebar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem('token'); 
        if (!token) {
          console.log("No token found");
          return;
        }
        const response = await axios.get("http://localhost:5000/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
      } catch (err) {
        console.log(err);
        console.log("Failed to get user");
      }
    }

    fetchUser();
  }, []);

  return (
    <div className="sidebar">
      <div className="profile-section">
        <h3>{user.username}</h3>
        <p>Welcome to your dashboard</p>
      </div>
      <nav>
        <ul>
          <li className="active">Dashboard</li>
          <li><Link  to="/booking" style={{textDecoration:"none"}}>Bookings</Link></li>
          <li > <Link to= "/place" style={{textDecoration:"none"}}>Places</Link></li>
          <li>Profile</li>
        </ul>
        <button> <Link style={{textDecoration:"none",color:"white"}} to="/login" >Log out</Link></button>

      </nav>
    </div>
  );
}

export default Sidebar;
