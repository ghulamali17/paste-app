import React from "react";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">404 - Snip Not Found</h1>
        <p className="text-gray-500">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
