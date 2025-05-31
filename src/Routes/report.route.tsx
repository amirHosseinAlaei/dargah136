import { lazy, Suspense } from "react";
import LandingLayout from "../leyout/LandingLeyout";
import Loading from "../components/commoen/Loading";
import ReportIndex from "../pages/Report/ReportIndex";

const LandingContent = lazy(() => import("../pages/landing/LandingContent"));
const Suspenswrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const ReportRoutes = {
  path: "/",
  element: <LandingLayout />,

  children: [
    {
      path: "/dargah/dashboard2/report",
      element: (
        <Suspenswrapper>
          <ReportIndex />
        </Suspenswrapper>
      ),
    },
  ],
};
export default ReportRoutes;
