import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    try {
      console.log("User Logged Out");
      if (localStorage.length === 0) {
        console.log("localStorage is empty");
      } else {
        localStorage.clear();
        window.location.reload(); // Perform a hard refresh
        console.log("localStorage is not empty");
      }
    } catch (error) {
      console.error("Error clearing LocalStorage:", error);
    }
    // If you want to redirect the user after the event
    // history.push('/new-route'); // Example redirection using history object
  }, []); //

  return (
    <div className="flex items-center justify-center h-screen ">
      <h2 className="text-3xl font-mono">You have Logged Out</h2>
    </div>
  );
};

export default Logout;
