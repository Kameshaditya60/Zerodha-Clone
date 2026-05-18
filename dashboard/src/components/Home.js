import React from "react";

import AuthCheck from "./AuthCheck";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  return (
    <AuthCheck>
      <TopBar />
      <Dashboard />
    </AuthCheck>
  );
};

export default Home;
