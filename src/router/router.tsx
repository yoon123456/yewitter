import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../component/protected-route";
import Layout from "../component/layout";
import Home from "../routes/home";
import Profile from "../routes/profile";
import Login from "../routes/login";
import CreateAccount from "../routes/create-account";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);
