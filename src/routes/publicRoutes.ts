import LoginDialog from "../components/LoginDialog";
import SignUpDialog from "../components/SignUpDialog";
import AboutPage from "../pages/About";
import { ROUTES } from "./routes";
import { lazy } from "react";

const LandingPage = lazy(() => import("../pages/LandingPage"));

export const publicRoutes = [
  { path: ROUTES.LandingPage, component: LandingPage },
  { path: ROUTES.Login, component: LoginDialog },
  { path: ROUTES.SignUp, component: SignUpDialog },
  { path: ROUTES.About, component: AboutPage },
];
