import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom"; // ✅ اضافه کن
import LandingLayout from "../leyout/LandingLeyout";
import Loading from "../components/commoen/Loading";

const LandingContent = lazy(() => import("../pages/landing/LandingContent"));

const Suspenswrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const landingRoutes = {
  path: "/",
  element: <LandingLayout />,
  children: [
    {
      index: true, // ✅ وقتی آدرس `/` زده بشه
      element: <Navigate to="/dargah/dashboard2/" replace /> // ریدایرکت کن
    },
    {
      path: "dargah/dashboard2/",
      element: (
        <Suspenswrapper>
          <LandingContent />
        </Suspenswrapper>
      ),
    },
  ],
};

export default landingRoutes;
