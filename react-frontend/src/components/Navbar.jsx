import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAdmin, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <img src="/logo.png" alt="Logo" height="30" className="d-inline-block align-text-top me-2" />

      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Authentic Photos</Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/explore">Explore</Link>
            </li>
            {user && isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-city">Create City</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/create-post">Create Post</Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="text-white me-3">Hi, {user.username}</span>
                <button onClick={handleLogout} className="btn btn-sm btn-outline-light">Logout</button>
              </>
            ) : (
              <>
                <Link className="btn btn-sm btn-outline-light me-2" to="/login">Login</Link>
                <Link className="btn btn-sm btn-outline-light" to="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
