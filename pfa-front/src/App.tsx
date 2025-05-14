import "./App.css";
import Layout from "./layouts/layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./routes/publicRoutes";

function App() {
  return (
    <BrowserRouter>
      {" "}
      {/* Wrap your Routes with BrowserRouter */}
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          {publicRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          fghjk
        </Route>

        {/* Catch-all */}
        <Route path="*" element={null} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
