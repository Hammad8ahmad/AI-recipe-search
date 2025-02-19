import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-[#a0b56d] text-black p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo or Title */}
        <div className=" font-bold font-mono text-2xl hover:text-[#fefae0]">
          <Link to="/">AI Recipe Search</Link>
        </div>

        {/* Nav Links */}
        <div className="space-x-4">
          <Link to="/" className=" hover:text-[#fefae0] text-xl font-mono">Home</Link>
          <Link to="/saved" className=" hover:text-[#fefae0] text-xl font-mono">Saved</Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
