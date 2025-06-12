import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/userSlice.js";
import { useNavigate } from "react-router-dom";

import {
  app,
  getAuth,
  createUserWithEmailAndPassword,
} from "../Firebase/firebase.js";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import toast from "react-hot-toast";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth(app); 
  const db = getFirestore(app); 

  const sendData = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Add user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date().toISOString(),
      });
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          name: name || user.displayName || "", 
        })
      );

      toast.success("Account created successfully!");
      Navigate("/")
    } catch (err) {
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        toast.error("Wrong Email or Password");
      } else {
        toast.error("Email-already-in-use");
      }
      console.error(err);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="text-center mb-6">
          <img
            className="w-10 h-10 mx-auto mb-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          <h1 className="text-2xl font-extrabold text-indigo-600">CodeSnip</h1>
        </div>

        <h2 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Create an account
        </h2>

        <form onSubmit={sendData} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
          >
            Create an account
          </button>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
