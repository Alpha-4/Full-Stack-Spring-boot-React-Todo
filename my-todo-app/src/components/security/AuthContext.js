import { createContext, useState } from "react";
import { useContext } from "react";
import { executeJWTAuthService } from "../apis/AuthenticationServiceApi";
import { apiClient } from "../apis/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [username, setUsername] = useState(null);

  const [authToken, setAuthToken] = useState(null);

  //let token = null;

  const login = async (username, password) => {
    try {
      const res = await executeJWTAuthService(username, password);
      if (res.data?.token) {
        const tok = "Bearer " + res.data.token;
        setAuthToken("Bearer " + res.data.token);
        setIsAuthenticated(true);
        setUsername(username);

        apiClient.interceptors.request.use((config) => {
          config.headers.Authorization = tok;
          return config;
        });

        return true;
      } else {
        setIsAuthenticated(false);
        setUsername(null);
        setAuthToken(null);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    setAuthToken(null);
    //Navigate("/logout");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, username, authToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
