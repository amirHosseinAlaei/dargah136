import { lazy, Suspense } from "react";
import FollowUpLayout from "../leyout/FollowUpLayout";
import FollowUpIndexSkeleton from "../components/commoen/Loading/FllowUp";

const FollowUpIndex = lazy(() => import("../pages/followUp/followUpIndex"));

const Suspenswrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Suspense fallback={<FollowUpIndexSkeleton />}>{children}</Suspense>;
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
