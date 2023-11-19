import React, { useEffect } from "react";
import { useAuth } from "./security/AuthContext";

function Logout() {
  const auth = useAuth();

  useEffect(() => auth.logout(), []);

  return (
    <div className="container w-10/12 mx-auto px-2 py-2 my-auto min-h-screen flex-col text-center">
      <h1 className="text-green-700 font-bold text-4xl">You are Logged out.</h1>
      <h3 className="text-lg text-gray-800 py-3">
        Thanks for using our services
      </h3>
    </div>
  );
}

export default Logout;
