import React from "react";
import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";

function Error() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate an API call or any asynchronous operation
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);
  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="text-center text-7xl p-60">
          Sorry :( 404! Page not Found...!
        </div>
      )}
    </div>
  );
}

export default Error;
