import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#a0b56d] text-black p-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Title with Fade-In Effect */}
        <motion.div
          className="font-bold font-mono text-xl md:text-2xl transition-colors duration-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/" className="hover:text-[#fefae0]  transition-colors duration-300">
            AI Recipe Search
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-black focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? (
            <X size={28} className="transition-transform duration-300 rotate-90" />
          ) : (
            <Menu size={28} />
          )}
        </motion.button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-xl font-mono border-b-4 border-transparent hover:text-[#fefae0] hover:border-b-[#fefae0] hover:border-b-4 hover:border-solid transition-colors duration-300">
            Home
          </Link>
          <Link to="/saved" className="text-xl font-mono border-b-4 border-transparent hover:text-[#fefae0] hover:border-b-[#fefae0] hover:border-b-4 hover:border-solid transition-colors duration-300">
            Saved
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 top-15 bg-[#a0b56d]/80 backdrop-blur-md shadow-lg rounded-lg p-3 flex flex-col space-y-3 w-44 md:hidden border border-[#76854d]"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Link
              to="/"
              className="block text-center text-lg font-mono hover:text-[#fefae0] transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/saved"
              className="block text-center text-lg font-mono hover:text-[#fefae0] transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Saved
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
