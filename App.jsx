import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Graphs from "./containers/Graphs.jsx";
import Devices from "./containers/Devices.jsx";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/details">
            <Graphs />
          </Route>
          <Route path="/">
            <Devices />
          </Route>
        </Switch>
    </Router>
  );
}