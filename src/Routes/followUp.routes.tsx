import { lazy, Suspense } from "react";
import Loading from "../components/commoen/Loading";
import FollowUpLayout from "../leyout/FollowUpLayout";

const FollowUpIndex = lazy(() => import("../pages/followUp/followUpIndex"));

const Suspenswrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const FollowUpRoutes = {
  path: "/",
  element: <FollowUpLayout />,

  children: [
    {
      path: "/dargah/dashboard2/followUp",
      element: (
        <Suspenswrapper>
          <FollowUpIndex />
        </Suspenswrapper>
      ),
    },
  ],
};

export default FollowUpRoutes;
