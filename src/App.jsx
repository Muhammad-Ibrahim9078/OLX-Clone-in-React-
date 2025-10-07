import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProductCard from "./pages/ProductCard";
import WithoutAuthDasboard from "./pages/WithoutAuthDasboard";
import AllProducts from "./pages/AllProducts"; // ✅ new page import
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <h2 className="text-center mt-20">Checking Authentication...</h2>;

  // ✅ Protected Route (for logged-in users only)
  const OnAuth = ({ children }) => {
    return user ? children : <Navigate to="/" replace />;
  };

  // ✅ Public Route (for non-logged-in users only)
  const PublicRoute = ({ children }) => {
    return !user ? children : <Navigate to="/dashboard" replace />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute>
          <WithoutAuthDasboard />
        </PublicRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/signup",
      element: (
        <PublicRoute>
          <Signup />
        </PublicRoute>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <OnAuth>
          <Dashboard />
        </OnAuth>
      ),
    },
    {
      path: "/productcard/:id",
      element: (
        <OnAuth>
          <ProductCard />
        </OnAuth>
      ),
    },
    {
      path: "/allproducts", // ✅ all products route
      element: <AllProducts />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
