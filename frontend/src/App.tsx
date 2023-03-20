import React from 'react'
import NavbarDrawer from "./NavbarDrawer"
import Cuboid from './Cuboid'
import HomeStyles from "./styles/Home.module.css"

import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (<NavbarDrawer/>),
  },
  {
    path: "cuboid",
    element: <Cuboid/>,
  },
]);

function App() {
  return (
    <div className={HomeStyles.body}>
        <RouterProvider router={router} />

    </div>
  )
}

export default App