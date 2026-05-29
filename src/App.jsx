import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from './pages/login'
import Signup from './pages/signUp'
import ForgotPassword from './pages/forgotPassword'
import Dashboard from './pages/dashboard'
import Layout from './pages/layout'
import CreateEvent from './pages/createEvent'
import Profile from './pages/profile'
import ManageEvents from './pages/manageEvents'
import RegisteredUsers from './pages/registered_users'
import SchoolAddImage from './pages/school_add_image'
import SchoolManageImage from './pages/school_manage_image'
import RegisteredEventUser from './pages/registered_event_user'
import Settings from './pages/settings'
import EditEvent from "./pages/editEvent";





// Dummy auth (replace with real logic)
const isAuthenticated = () => {
  return localStorage.getItem("auth") === "true";
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Main App
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* Nested routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="upload-image" element={<UploadImage />} />
          <Route path="current-image" element={<CurrentImage />} /> */}
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/manage-events" element={<ManageEvents />} />
          <Route path="/registered-event-users" element={<RegisteredEventUser />} />
          <Route path="/registered-event-users/:eventName" element={<RegisteredUsers />} />
          <Route path="/school-add-image" element={<SchoolAddImage />} />
          <Route path="/school-manage-image" element={<SchoolManageImage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;