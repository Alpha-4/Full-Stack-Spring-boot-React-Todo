import { apiClient } from "./ApiClient";

export const helloWorldApi = () => apiClient.get("/hello-world-bean");

export const helloWorldPathVarApi = (name) =>
  apiClient.get(`/hello-world/path-variable/${name}`);

export const executeBasicAuthService = (token) =>
  apiClient.get("/basicauth", {
    headers: {
      Authorization: token,
    },
  });

export const executeJWTAuthService = (username, password) =>
  apiClient.post("/authenticate", {
    username: username,
    password: password,
  });
