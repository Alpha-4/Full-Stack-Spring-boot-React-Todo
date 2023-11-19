import { Link, useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { useState } from "react";
import { helloWorldPathVarApi } from "./apis/AuthenticationServiceApi";

const Welcome = () => {
  const { username } = useParams();
  const auth = useAuth();
  const isAuthenticated = auth.isAuthenticated;
  const [message, setMessage] = useState("");

  const parseRes = (response) => {
    //console.log("response:" + response.data);
    setMessage(response.data.message);
  };

  const parseErr = (error) => console.log("some error occured--" + error);

  const cleanUp = () => console.log("finally called");

  function helloWorldApiBtn() {
    helloWorldPathVarApi("arun")
      .then(parseRes)
      .catch(parseErr)
      .finally(cleanUp);
  }

  return (
    <div className="container w-10/12 mx-auto px-2 py-2 my-auto min-h-screen flex-col text-center">
      <h1 className="text-grey-800 font-bold text-4xl">
        Hi {username}, welcome to Todo Application
      </h1>
      {isAuthenticated && (
        <h3 className="text-lg text-gray-800 font-extrabold mt-3 text-center py-3">
          Click here for:
          <Link to="/todos" className="underline">
            Your Todos
          </Link>
        </h3>
      )}

      <button
        className="m-3 text-gray-800 bg-green-400"
        onClick={helloWorldApiBtn}
      >
        Hello World
      </button>

      <h3 className="m-5 text-sm text-gray-800 font-extrabold text-center py-3">
        {message}
      </h3>
    </div>
  );
};

export default Welcome;
