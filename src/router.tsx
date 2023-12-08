import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import { UserPage } from "./pages/User";
import { DetailUserPage } from "./pages/User/DetailUser";
import { AddUserPage } from "./pages/User/AddUser";
import EditUserPage from "./pages/User/EditUser";

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
  {
    path: "/edit-user/:id",
    element: <EditUserPage />,
  },
  {
    path: "/detail-user/:id",
    element: <DetailUserPage />,
  },


]);
export default router;
