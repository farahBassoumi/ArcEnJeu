import AddMemoryGame from "../pages/AddMemoryGame";
import MemoryGameComponent from "../pages/AddMemoryGame";
import AddMemoryGameScreen from "../pages/AddMemoryGameScreen";
import { ROUTES } from "./routes";
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));

export const privateRoutes = [
  { path: ROUTES.Home, component: Home },
  { path: ROUTES.AddMemoryGame, component: AddMemoryGame },
  { path: ROUTES.AddMemoryGameScreen, component: AddMemoryGameScreen },
  { path: ROUTES.AddMemoryGameLevel, component: MemoryGameComponent },
];
