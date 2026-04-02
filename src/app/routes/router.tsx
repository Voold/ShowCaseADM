import {ProtectedRoute} from "@/features/protected-route";
import {LoginPage} from "@/pages/login";
import {MainPage} from "@/pages/main/";
import {NotFoundPage} from "@/pages/not-found";
import { ROUTES } from "@/shared/config";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
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
        path: ROUTES.ADMIN,
        element: <MainPage/>
      }
    ]
  }
])
