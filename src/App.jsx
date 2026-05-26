import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./page/Main.jsx";
import Home from "./page/Home.jsx";
import DrinkDetail from "./page/DrinkDetail.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "drink/:id",
          element: <DrinkDetail />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
