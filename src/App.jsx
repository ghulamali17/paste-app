import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ViewSnips from "./components/ViewSnips";
import Home from "./components/Home";
import AppLayout from "./components/AppLayout";
import Snips from "./components/Snips";
import NotFound from "./components/NotFound";


function App() {
  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NotFound />, 
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/snips",
          element: <Snips />,
        },
        {
          path: "/snips/:id/view",
          element: <ViewSnips />,
        },
        {
          path: "/pastes/:id",
          element: <Home />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRoute} />;
}

export default App;
