import { ROUTES } from "./routes";
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));

export const privateRoutes = [{ path: ROUTES.Home, component: Home }];
