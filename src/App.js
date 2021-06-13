import "./App.css";
import { useState } from "react";

import Home from "./pages/Home";
import Task from "./pages/Task";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SideBar from "./Components/SideBar";
import TaskContextProvider from "./context/TaskContext";

const MainPages = () => {
  // setting the state of the modal containing the form
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TaskContextProvider>
      {" "}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "20rem auto",
          backgroundColor: "#0E123E",
        }}
        className=" p-4 rounded-md h-screen pl-1 "
      >
        <div>
          <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div style={{ backgroundColor: "#e3e8f1" }} className="rounded-md">
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/task">
              <Task isOpen={isOpen} setIsOpen={setIsOpen} />
            </Route>
          </Switch>
        </div>
      </div>
    </TaskContextProvider>
  );
};
// the main component rendering the app;
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signUp">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <MainPages />
        </Route>
      </Switch>
      <Redirect from="/" to="/login" />
    </Router>
  );
}

export default App;
