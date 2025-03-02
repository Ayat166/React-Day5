import React from "react";
import UpperNavBar from "./components/UpperNavBar";
import { Outlet } from "react-router-dom";
import { CartProvider  } from "./components/CartContext";

function Layout() {
  return (
    <div>
      <CartProvider>
        <UpperNavBar />
        <Outlet />
      </CartProvider>
    </div>
  );
}

export default Layout;
