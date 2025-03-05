import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Routes,Navigate,Link,Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="p-4 bg-gray-200 flex justify-between">
        <h1 className="text-xl font-bold">MelodyVerse</h1>
        <nav>
          {!isAuthenticated ? (
            <>
              <Link to="/register" className="mr-4">Register</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-red-500">Logout</button>
          )}
        </nav>
      </div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/welcome" element={isAuthenticated ? <Welcome /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/welcome" : "/register"} />} />
      </Routes>
      </div>
    </Router>
  );
}
