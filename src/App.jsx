import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import ProductCard from "./pages/ProductCard"



function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path:'/productcard/:id',
      element: <ProductCard />
    }
  ])

  return (
      <RouterProvider router={router}>
      
      </RouterProvider>
  )
}

export default App
