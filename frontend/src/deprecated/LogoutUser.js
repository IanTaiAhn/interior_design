import React from "react";

const LogoutUser = () => {
  const handleLogoutUser = () => {
    try {
      localStorage.clear();
      console.log("User Logged Out");
    } catch (error) {
      console.error("Error clearing LocalStorage:", error);
    }
  };

  return <button onClick={handleLogoutUser}>Logout</button>;
};

export default LogoutUser;
