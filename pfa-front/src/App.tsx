import "./App.css";
import Layout from "./layouts/layout";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { publicRoutes } from "./routes/publicRoutes";
import { privateRoutes } from "./routes/privateRoutes";
import { PUBLIC_ROUTES } from "./routes/routes";
import { useEffect } from "react";

function NavigationHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const validRoutes = [
      ...privateRoutes.map((r) => r.path),
      ...publicRoutes.map((r) => r.path),
    ];

    if (
      window.location.pathname === "/" ||
      !validRoutes.includes(window.location.pathname)
    ) {
      navigate(PUBLIC_ROUTES.LandingPage, { replace: true });
    }
  }, []);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <NavigationHandler />
      <Routes>
        <Route element={<Layout />}>
          {publicRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}

          {privateRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Route>

        <Route path="*" element={null} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
