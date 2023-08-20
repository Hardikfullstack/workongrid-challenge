import React from 'react';
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import ReactGridLayout from "./components/gridView";


const router = createBrowserRouter([
  {
    path: "/health",
    element: <h1>Success</h1>,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/grid",
    element: <ReactGridLayout columns={3} numBoxes={18} />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
