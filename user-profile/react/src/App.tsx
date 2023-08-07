import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";
import Home from "./routes";
import AccountIndex from "./routes/account";
import Update from "./routes/account/update";
import UpdateEmail from "./routes/account/update-email";
import UpdatePassword from "./routes/account/update-password";
import ForgotPassword from "./routes/auth/forgotpassword";
import SignIn from "./routes/auth/signin";
import SignUp from "./routes/auth/signup";
import Profile from "./routes/u/profile";
import { profileLoader, profileSlugLoader } from "./lib/utils";

let router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        loader: profileLoader,
        element: <Home />,
      },
      {
        path: "/account/*",
        children: [
          {
            index: true,
            loader: profileLoader,
            element: <AccountIndex />,
          },
          {
            path: "update",
            loader: profileLoader,
            element: <Update />,
          },
          {
            path: "update-email",
            loader: profileLoader,
            element: <UpdateEmail />,
          },
          {
            path: "update-password",
            loader: profileLoader,
            element: <UpdatePassword />,
          },
        ],
      },
    ],
  },
  {
    path: "/auth/*",
    element: <AuthLayout />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "*",
        element: <Navigate to="signin" replace />,
      },
    ],
  },
  {
    path: "u/:slug",
    loader: profileSlugLoader,
    element: <Profile />,
  },
]);

function Fallback() {
  return <p>Performing initial data load</p>;
}

function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}

export default App;
