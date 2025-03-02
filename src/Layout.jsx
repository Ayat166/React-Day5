import React from 'react'
import UpperNavBar from './components/UpperNavBar'
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <UpperNavBar />
      <Outlet />
    </div>
  )
}

export default Layout
