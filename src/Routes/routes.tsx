import { createBrowserRouter } from "react-router-dom";
import LoginRoutes from "./auth.routes";
import landingRoutes from "./Landing.routes";
import ReportRoutes from "./report.route";
import FollowUpRoutes from "./followUp.routes";
const routes = createBrowserRouter([landingRoutes, LoginRoutes  , ReportRoutes  ,FollowUpRoutes]);

export default routes;
