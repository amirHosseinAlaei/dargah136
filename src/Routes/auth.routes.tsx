import { lazy, Suspense } from "react";
import LoginLayout from "../leyout/AuthLayout";
import LoginSkeleton from "../components/commoen/Loading/LoginSkeleton";
import RegisterSkeleton from "../components/commoen/Loading/RegisterSkeleton";
import ForgetSkeleton from "../components/commoen/Loading/ForgetAndChange";
const Login = lazy(() => import("../pages/authentication/Login"));
const Register = lazy(() => import("../pages/authentication/Register"));
const Forget = lazy(() => import("../pages/authentication/Forget"));
const ChangeNumber = lazy(() => import("../pages/authentication/ChangeNumber"));

const Suspenswrapper: React.FC<{
  children: React.ReactNode;
  fallback: React.ReactNode;
}> = ({ children, fallback }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

const LoginRoutes = {
  path: "/user2",
  element: <LoginLayout />,
  children: [
    {
      path: "/user2/login",
      element: (
        <Suspenswrapper fallback={<LoginSkeleton />}>
          <Login />
        </Suspenswrapper>
      ),
    },

    {
      path: "/user2/register",
      element: (
        <Suspenswrapper fallback={<RegisterSkeleton />}>
          <Register />
        </Suspenswrapper>
      ),
    },

    {
      path: "/user2/forget",
      element: (
        <Suspenswrapper fallback={<ForgetSkeleton />}>
          <Forget />
        </Suspenswrapper>
      ),
    },

    {
      path: "/user2/changeNumber",
      element: (
        <Suspenswrapper fallback={<ForgetSkeleton />}>
          <ChangeNumber />
        </Suspenswrapper>
      ),
    },
  ],
};

export default LoginRoutes;
