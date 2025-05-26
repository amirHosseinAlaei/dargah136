import { createBrowserRouter } from "react-router-dom";
import LoginRoutes from "./auth.routes";
import landingRoutes from "./Landing.routes";
const routes= createBrowserRouter ([
landingRoutes , LoginRoutes 
])


export default routes