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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./Firebase/firebase";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const plainUser = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || "",
        };

        dispatch(setUser(plainUser));
        localStorage.setItem("user", JSON.stringify(plainUser));
      } else {
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/snips", element: <Snips /> },
        { path: "/snips/:id/view", element: <ViewSnips /> },
        { path: "/pastes/:id", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
      ],
    },
  ]);

  return <RouterProvider router={appRoute} />;
}

export default App;
