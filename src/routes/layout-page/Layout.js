import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../component/Navbar/Navbar';
// import './Layout.css';

function Layout() {
  return (
    <div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
