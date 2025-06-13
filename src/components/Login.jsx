import React, { useState } from "react";
import {
  app,
  getAuth,
  signInWithEmailAndPassword,
} from "../Firebase/firebase.js";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth(app);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   Sign in function firebases
  const signInUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const plainUser = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email.split("@")[0],
      };

      // Save to Redux and localStorage
      dispatch(setUser(plainUser));
      localStorage.setItem("user", JSON.stringify(plainUser));

      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/network-request-failed") {
        toast.error("No internet connection. Please check your network.");
      } else if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        toast.error("Wrong Email or Password");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="text-center mb-6">
          <img
            className="w-10 h-10 mx-auto mb-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          <h1 className="text-2xl font-extrabold text-indigo-600">CodeSnip</h1>
        </div>
        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Sign in to your account
        </h2>
        <form onSubmit={signInUser} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link to={"/signup"} className="text-indigo-600 hover:underlin">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
