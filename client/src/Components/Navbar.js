
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-gray-900 text-gray-100 shadow-lg z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-teal-500">
          InterviewCode
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-teal-500 transition duration-300">
            Home
          </Link>
          <Link to="/features" className="hover:text-teal-500 transition duration-300">
            Features
          </Link>
          <Link to="/about" className="hover:text-teal-500 transition duration-300">
            About
          </Link>
          <Link to="/auth" className="hover:text-teal-500 transition duration-300">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-teal-500 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 text-gray-100 px-6 py-4">
          <Link
            to="/"
            className="block py-2 hover:text-teal-500 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/features"
            className="block py-2 hover:text-teal-500 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/about"
            className="block py-2 hover:text-teal-500 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/auth"
            className="block py-2 hover:text-teal-500 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;

