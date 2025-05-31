import { lazy, Suspense } from "react";
import LoginLayout from "../leyout/AuthLayout";
import Loading from "../components/commoen/Loading";
import Register from "../pages/authentication/Register";
import Forget from "../pages/authentication/forget";
import ChangeNumber from "../pages/authentication/changeNumber";
const Login = lazy(() => import("../pages/authentication/Login"));
const Suspenswrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const LoginRoutes = {
  path: "/user2",
  element: <LoginLayout />,
  children: [
    {
      path: "/user2/login",
      element: (
        <Suspenswrapper>
          <Login />
        </Suspenswrapper>
      ),
    },

    {
      path: "/user2/register",
      element: (
        <Suspenswrapper>
          <Register />
        </Suspenswrapper>
      ),
    },

    {
      path: "/user2/forget",
      element: (
        <Suspenswrapper>
          <Forget />
        </Suspenswrapper>
      ),
    },

    {
      path: "/user2/changeNumber",
      element: <Suspenswrapper>
        <ChangeNumber/>
      </Suspenswrapper>,
    },
  ],
};

export default LoginRoutes;
