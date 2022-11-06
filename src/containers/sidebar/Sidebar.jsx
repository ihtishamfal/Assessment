/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="sidebar">
      <header className="header" role="banner">
        <h1 className="logo">
          <a href="#">
            Admin
            {' '}
            <span>Dashboard</span>
          </a>
        </h1>
        <div className="nav-wrap">
          <nav className="main-nav" role="navigation">
            <ul className="unstyled list-hover-slide">
              <li>
                <Link to="/dashboard/registeredcars">Total Register Cars</Link>
              </li>
              <li>
                <Link to="/dashboard/categories">Categories</Link>
              </li>
              <li>
                <Link to="/dashboard/carsmanagement">Cars Registration</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Sidebar;
