import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import ErrorPage from "@/components/ErrorPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="*" element={<ErrorPage statusCode={404} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;