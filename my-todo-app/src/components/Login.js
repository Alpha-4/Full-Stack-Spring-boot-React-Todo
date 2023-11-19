import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("in28minutes");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const isAuthenticated = auth.isAuthenticated;
  const navigate = useNavigate();

  async function onLogin() {
    if (await auth.login(username, password)) navigate(`/welcome/${username}`);
  }

  return (
    <div className="container w-10/12 mx-auto px-2 py-8 my-auto min-h-screen">
      {isAuthenticated && (
        <h1 className="text-center px-2 py-2 text-green-700 font-bold">
          Authenticated Sucessfully
        </h1>
      )}
      {!isAuthenticated && (
        <h1 className="text-center px-2 py-2 text-red-700 font-bold">
          Authentication failed. Please try again
        </h1>
      )}
      <div className="text-center flex flex-wrap px-2 py-2 w-2/3 m-auto">
        <label className="my-3 w-1/3 p-2.5 text-sm font-semibold text-gray-700 dark:text-white">
          Username
        </label>
        <input
          type="text"
          className="my-3 w-2/3 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="in28minutes"
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />

        <label className="my-3 w-1/3 p-2.5 text-sm font-semibold text-gray-700 dark:text-white">
          Password
        </label>
        <input
          type="password"
          className="my-3 w-2/3 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />

        {!isAuthenticated && (
          <button
            className="mx-auto my-3 w-1/5 p-2.5 text-sm font-bold text-white bg-lime-700 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 dark:border-gray-600  dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
            type="submit"
            onClick={onLogin}
          >
            login
          </button>
        )}

        {isAuthenticated && (
          <button
            className="mx-auto my-3 w-1/5 p-2.5 text-sm font-bold text-white bg-lime-700 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 dark:border-gray-600  dark:focus:ring-yellow-500 dark:focus:border-yellow-500"
            type="submit"
            onClick={auth.logout()}
          >
            logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
