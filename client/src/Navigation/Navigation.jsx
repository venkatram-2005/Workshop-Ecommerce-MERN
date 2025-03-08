import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './Navigation.css'

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="nav-container">
      <Link to="/">Home</Link>
      {
        user ? (
          <>
            {user.role === "user" && <Link to="/cart">Cart</Link>}
            {user.role === "admin" && <Link to="/add-product">Add Product</Link>}
            <Link onClick={logout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )
      }
    </div>
  );
}
