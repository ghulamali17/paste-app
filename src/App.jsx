import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ViewPaste from "./components/ViewPaste";
import Home from "./components/Home";
import Paste from "./components/paste";
import AppLayout from "./components/AppLayout";

function App() {
  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/paste",
          element: <Paste />,
        },
        {
          path: "/pastes/:id/view",
          element: <ViewPaste />,
        },
        {
          path: "/pastes/:id",
          element: <Home />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRoute} />
    </>
  );
}

export default App;
