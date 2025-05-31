import { createBrowserRouter } from "react-router-dom";
import LoginRoutes from "./auth.routes";
import landingRoutes from "./Landing.routes";
import ReportRoutes from "./report.route";
const routes = createBrowserRouter([landingRoutes, LoginRoutes  , ReportRoutes ]);

export default routes;
