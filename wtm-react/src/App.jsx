import React, { useContext } from "react";
import HomeView from "./pages/homeview";
import MeetingCreator from "./pages/meeting/meetingcreator";
import MeetingDetails from "./pages/meeting/meetingdetails";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import Profile from "./pages/profile";
import Schedule from "./pages/schedule";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicNavbar from "./layout/PublicNavbar";
import AuthenticatedNavbar from "./layout/AuthenticatedNavbar";
import Sidebar from "./layout/Sidebar";

import "./styles/App.css";

import { UserContext } from "./context/UserProvider";
import LandingPage from "./pages/landing";

const ProtectedRoute = ({ children }) => {
  console.log("checking if following is valid: ", children);
  const { token } = useContext(UserContext);
  console.log(token);
  return token ? children : <Navigate to="/login" replace />;
};

const LoginOnlyRoute = ({ children }) => {
  const { token } = useContext(UserContext);
  return token ? <Navigate to="/home" replace /> : children;
};

function App() {

  const { token } = useContext(UserContext);
 
  return (
    <div className="flex flex-row">
      {token && <Sidebar/>}
      <div className="flex flex-col w-full">

        {token? <AuthenticatedNavbar /> : <PublicNavbar/>}
        <Routes>
          <Route
            path="/"
            element={
              <LoginOnlyRoute>
                <LandingPage />
              </LoginOnlyRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LoginOnlyRoute>
                <LoginPage />
              </LoginOnlyRoute>
            }
          />
          <Route
            path="/register"
            element={
              <LoginOnlyRoute>
                <RegisterPage />
              </LoginOnlyRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <MeetingCreator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meeting/:id"
            element={
              <ProtectedRoute>
                <MeetingDetails />
              </ProtectedRoute>
            }
          />{" "}
          {/* Dynamic route for meeting details */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <HomeView />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
