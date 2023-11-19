import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function Header() {
  const auth = useAuth();
  const isAuthenticated = auth.isAuthenticated;

  return (
    <div className="sticky top-0 flex flex-wrap justify-between px-2 py-2 h-1/6 my-auto bg-sky-900">
      <div className="text-gray-200 text-4xl font-sans hover:font-serif">
        <Link to="/">Home</Link>
      </div>
      <div className="text-gray-200 font-semibold text-1xl font-sans hover:font-serif">
        {isAuthenticated && <Link to="/todos">Todos</Link>}
      </div>
      <div className="text-gray-200 font-semibold text-1xl font-sans hover:font-serif">
        {isAuthenticated && <Link to="/welcome">About</Link>}
      </div>
      <div className="text-green-200 text-4xl font-sans hover:font-serif">
        {!isAuthenticated && <Link to="/login">Login</Link>}
        {isAuthenticated && <Link to="/logout">logout</Link>}
      </div>
    </div>
  );
}

export default Header;
