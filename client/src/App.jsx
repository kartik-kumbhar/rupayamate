import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import Login from './components/pages/Login';
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Error from "./components/pages/Error"
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Logout from './components/pages/Logout';
import Update from "./components/pages/Update";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Dashboard /><Footer /></>
    },
    {
      path: "/form",
      element: <><Navbar /><TransactionForm /><Footer /></>
    },
    {
      path: "/list",
      element: <><Navbar /><TransactionList /><Footer /></>
    },

    {
      path: "/register",
      element: <><Navbar /><Register /><Footer /></>
    },
    {
      path: "/login",
      element: <><Navbar /><Login /><Footer /></>
    },
    {
      path: "/logout",
      element: <><Navbar /><Logout /><Footer /></>
    },
    {
      path: "/users/:id/edit",
      element: <><Navbar /><Update /><Footer /></>
    },
    {
      path: "*",
      element: <><Navbar /><Error /><Footer /></>
    }
  ])

  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
