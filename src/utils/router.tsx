import {createBrowserRouter} from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute.tsx";
import LoginPage from "@/pages/LoginPage/LoginPage.tsx";
import MainPage from "@/pages/MainPage/MainPage.tsx";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "*",
    element: <NotFoundPage/>
  },
  {
    element: <ProtectedRoute/>,
    children: [
      {
        path: "/admin",
        element: <MainPage/>
      }
    ]
  }
])
