import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import NotFound from "./components/NotFound";
import useAuth from "./hooks/useAuth";
import ProductDetailScreen from "./screens/ProductDetailScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

// Higher-order component for protected routes
const AuthenticatedRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/products" />
          ) : (
            <LoginScreen setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen setIsAuthenticated={setIsAuthenticated}/>} />

      <Route
        path="/products"
        element={
          <AuthenticatedRoute
            element={<HomeScreen />}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route
        path="/products/:id"
        element={
          <AuthenticatedRoute
            element={<ProductDetailScreen />}
            isAuthenticated={isAuthenticated}
          />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
