import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-(--color-beige)">
      <Header />
      <main className="flex-1 px-4 py-10 md:px-10 md:py-11">
        <div className="flex flex-col items-center w-full h-full overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
