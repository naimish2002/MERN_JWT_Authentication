import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Login,
  NotFound,
  Profile,
  Register,
} from "./pages/index";
import { useSelector } from "react-redux";

function App() {
  const { auth } = useSelector((state) => state);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={auth.accessToken ? <Profile /> : <Login />}
          />
          <Route
            path="/register"
            element={auth.accessToken ? <Profile /> : <Register />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
