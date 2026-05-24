import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./page/Main.jsx";
import Home from "./page/Home.jsx";

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
