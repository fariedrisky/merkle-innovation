import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import { UserPage } from "./pages/User";
import { DetailUserPage } from "./pages/User/DetailUser";
import { AddUserPage } from "./pages/User/AddUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/users",
    element: <UserPage />,
  },
  {
    path: "/add-user",
    element: <AddUserPage />,
  },
  // {
  //   path: "/edit-user/:id",
  //   element: <Edit />,
  // }
  {
    path: "/detail-user/:id",
    element: <DetailUserPage />,
  },


]);
export default router;
