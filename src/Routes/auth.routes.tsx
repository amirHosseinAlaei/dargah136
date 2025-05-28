import { lazy, Suspense } from "react";
import LoginLayout from "../leyout/AuthLayout";
import Loading from "../components/commoen/Loading";
import Register from "../pages/authentication/Register";
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
          <Register/>
        </Suspenswrapper>
      ),
    },
  ],
};

export default LoginRoutes;
