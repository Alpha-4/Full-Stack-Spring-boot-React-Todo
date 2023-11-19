import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./components/Welcome";
import ErrorComponent from "./components/ErrorComponent";
import Todos from "./components/Todos";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Logout from "./components/Logout";
import { AuthProvider, useAuth } from "./components/security/AuthContext";
import TodoComponent from "./components/TodoComponent";

function AuthenticatedRoute({ children }) {
  const auth = useAuth();
  if (auth.isAuthenticated) return children;
  return <Navigate to="/" />;
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />

            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <Welcome />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <Todos />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todo/:id?"
              element={
                <AuthenticatedRoute>
                  <TodoComponent />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
