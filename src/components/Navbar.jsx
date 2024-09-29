import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "";
      case "/radio":
        return "DA FASH Radio";
      case "/videos":
        return "DA FASH Videos";
    }
  };

  return (
    <nav className="bg-black fixed top-0 left-0 w-full text-white px-5 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-[#dfff1d] text-2xl fire-sans">{getTitle()}</h1>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="text-white px-4 py-2 lg:hover:text-[#dfff1d]"
          >
            Home
          </Link>
          <Link
            to="/radio"
            className="text-white px-4 py-2 lg:hover:text-[#dfff1d]"
          >
            Radio
          </Link>
          <Link
            to="/videos"
            className="text-white px-4 py-2 lg:hover:text-[#dfff1d]"
          >
            Videos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
