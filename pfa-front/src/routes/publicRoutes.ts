import { ROUTES } from "./routes";
import { lazy } from "react";

const LandingPage = lazy(() => import("../pages/LandingPage"));

export const publicRoutes = [
  { path: ROUTES.LandingPage, component: LandingPage },
];
