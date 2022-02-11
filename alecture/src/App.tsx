import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Workspace from "./layouts/Workspace/Workspace";
import Channel from "./pages/Channel/Channel";
import DirectMessage from "./pages/DirectMessage/DirectMessage";
import Login from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/channel" component={Channel} />
        <Route path="/workspace/:workspace" component={Workspace} />
        <Route path="/*" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
