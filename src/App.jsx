import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import ViewSnips from "./components/ViewSnips";
import Home from "./components/Home";
import AppLayout from "./components/AppLayout";
import Snips from "./components/Snips";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./Redux/userSlice";

function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);
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
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRoute} />;
}

export default App;
