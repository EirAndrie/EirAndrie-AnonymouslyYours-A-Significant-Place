import React from "react";
import AdminDashboard from "./pages/AdminDashboard";
import { Route, Routes } from "react-router";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
    </Routes>
  );
};

export default App;
