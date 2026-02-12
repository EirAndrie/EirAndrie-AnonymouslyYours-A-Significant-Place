import React from "react";
import { Route, Routes } from "react-router";
import BrowsePage from "./Pages/BrowsePage";
import LandingPage from "./Pages/LandingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/browse" element={<BrowsePage />} />
    </Routes>
  );
};

export default App;
