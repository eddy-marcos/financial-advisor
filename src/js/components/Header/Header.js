import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => (
  <div className="row header">
    <Link to="/">
      <img src="/public/images/home-icon.png" />
    </Link>
    <h1 className="text-center">Financial Advisor</h1>
  </div>
)

export default Header;