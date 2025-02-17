import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <div className="text-white font-bold text-xl">
          <Link to="/">My App</Link>
        </div>

        {/* Nav Links */}
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">Home</Link>
          <Link to="/saved" className="text-white hover:text-gray-400">Saved Recipes</Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
