import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Workspace from "./layouts/Workspace/Workspace";
import Channel from "./pages/Channel/Channel";
import DirectMessage from "./pages/DirectMessage/DirectMessage";
import Login from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/*" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
