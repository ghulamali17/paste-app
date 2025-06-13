Certainly! Here's the entire updated `README.md` content ready for copy-paste into your project:

---

````markdown
# 📝 Paste App

A lightweight web app to create, view, update, and manage text snippets.  
Perfect for quickly storing and sharing code blocks, notes, or ideas.

Built using **React**, **Tailwind CSS**, **Redux**, **Firebase**, and **Vite** for fast and responsive performance.

---

## 🚀 Features

- 🔐 User authentication (signup/login via Firebase)
- 🔍 Search snippets by title
- 🧾 Create, update, delete personal text pastes
- 📋 Copy content to clipboard
- 🕒 Displays creation date
- ☁️ Cloud storage using Firestore
- 💾 Global state management with Redux

---

## 🛠️ Tech Stack

- React
- Redux Toolkit
- Firebase (Auth + Firestore)
- Tailwind CSS
- React Router
- Vite

---

## 📦 Installation

```bash
git clone https://github.com/ghulamali17/paste-app
cd paste-app
npm install
npm run dev
````

---

## 🔧 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.

2. Enable **Authentication > Sign-in method > Email/Password**.

3. Create two Firestore collections:

   * `users` → where each document ID is the user’s `uid`
   * `snips` → where each document contains:

     * `uid`, `title`, `content`, `createdAt`

4. Create a file:

   ```
   src/Firebase/firebase.js
   ```

5. Add the following config:

```js
// src/Firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 🔐 Firestore Rules

Make sure your Firestore rules look like this:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /snips/{snipId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---


