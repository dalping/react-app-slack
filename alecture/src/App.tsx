import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Channel from "./pages/Channel/Channel";
import Login from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/workspace/channel" element={<Channel />} />
        <Route path="/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
