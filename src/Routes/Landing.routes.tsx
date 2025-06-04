import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import LayoutLoading from "../components/commoen/Loading/LandingLayoutLoading";
import ContentLoading from "../components/commoen/Loading/ContentLoading";

// تابع delay برای ایجاد تاخیر مصنوعی
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// فقط LandingContent با تاخیر ۴۰۰ میلی‌ثانیه لود می‌شود
const LandingLayout = lazy(() => import("../leyout/LandingLeyout"));
const LandingContent = lazy(() =>
  delay(300).then(() => import("../pages/landing/LandingContent"))
);

const landingRoutes = {
  path: "/",
  element: (
    <Suspense fallback={<LayoutLoading />}>
      <LandingLayout />
    </Suspense>
  ),
  children: [
    {
      index: true,
      element: <Navigate to="/dargah/dashboard2/" replace />,
    },
    {
      path: "dargah/dashboard2/",
      element: (
        <Suspense fallback={<ContentLoading />}>
          <LandingContent />
        </Suspense>
      ),
    },
  ],
};

export default landingRoutes;
