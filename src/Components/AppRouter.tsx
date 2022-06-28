import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainContent } from "../pages/MainContent";
import { Statistics } from "../pages/Statistics";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}
