/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Message from "./views/Message";
import Create from "./views/Create";
import Profile from "./views/Profile";
import OtherProfile from "./views/OtherProfile";
import Login from "./views/Login";
import Register from "./views/Register";

import Auth from "./hoc/auth";

import "./app.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/message" element={Auth(Message, null, false)} />
        <Route path="/create" element={Auth(Create, null, false)} />
        <Route path="/profile/:id" element={Auth(OtherProfile, null, false)} />
        <Route path="/profile" element={Auth(Profile, null, false)} />
        <Route path="/" element={Auth(Dashboard, null, false)} />
        <Route path="/login" element={Auth(Login, null, false)} />
        <Route path="/register" element={Register} />
      </Routes>
    </div>
  );
}

export default App;
