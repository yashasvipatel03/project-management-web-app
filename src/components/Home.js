import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Welcome</h1>
    <div style={{flexDirection: "row"}}>    
        <Link to="/login"><button>Login</button></Link>
    <Link to="/signup"><button>Signup</button></Link></div>
    {/* <Link to="/admin">
  <button>Admin Panel</button>
</Link> */}

  </div>
);

export default Home;
