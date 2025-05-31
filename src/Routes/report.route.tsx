import { lazy, Suspense } from "react";
import Loading from "../components/commoen/Loading";
import ReportIndex from "../pages/Report/ReportIndex";
import ReportLayout from "../leyout/ReportLayout";
const Suspenswrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
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
