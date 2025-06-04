import { lazy, Suspense } from "react";
import ReportLayout from "../leyout/ReportLayout";
import ReportStep1Skeleton from "../components/commoen/Loading/ReportLoading";

const ReportIndex = lazy(() => import("../pages/Report/ReportIndex"));

const Suspenswrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Suspense fallback={<ReportStep1Skeleton />}>{children}</Suspense>;
};

const ReportRoutes = {
  path: "/",
  element: <ReportLayout />,

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
