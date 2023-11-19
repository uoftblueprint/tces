import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RouteGuard from "./components/route-guard-component";
import DashboardPage from "./pages/dashboard";
import AdminDashboard from "./pages/admin-dashboard";
import LoginPage from "./pages/login";
import CreatePage from "./pages/create-user";
import EditPage from "./pages/edit-user";

import mockJobUpdates from "./mock-data/mockJobUpdates";
import mockUser from "./mock-data/mockUser";
import mockManagedUsers from "./mock-data/mockManagedUsers";

function App() {
  // redirect urls in-case user has a cached login or not
  const notAuthRedirect = "/signin";
  const AuthRedirect = "/dashboard";

  // states defined at the very root of the react tree (will be passed down to contributing child components)
  // User State
  const [currUser] = useState(mockUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Job Updates State
  const [jobUpdates] = useState(mockJobUpdates);

  // Admin State
  const [managedUsers, setManagedUsers] = useState(mockManagedUsers);

  // declaring routes here
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="/signin"
          element={
            <RouteGuard isPermitted={!isAuthenticated} redirect={AuthRedirect}>
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            </RouteGuard>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RouteGuard
              isPermitted={isAuthenticated}
              redirect={notAuthRedirect}
            >
              <DashboardPage currUser={currUser} jobUpdates={jobUpdates} />
            </RouteGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <RouteGuard
              isPermitted={isAuthenticated}
              redirect={notAuthRedirect}
            >
              <RouteGuard
                isPermitted={currUser.isAdmin}
                redirect={AuthRedirect}
              >
                <AdminDashboard
                  managedUsers={managedUsers}
                  setManagedUsers={setManagedUsers}
                />
              </RouteGuard>
            </RouteGuard>
          }
        />
        <Route
          path="/admin/create-user"
          element={
            <RouteGuard
              isPermitted={isAuthenticated}
              redirect={notAuthRedirect}
            >
              <RouteGuard
                isPermitted={currUser.isAdmin}
                redirect={AuthRedirect}
              >
                <CreatePage setManagedUsers={setManagedUsers} />
              </RouteGuard>
            </RouteGuard>
          }
        />
        <Route
          path="/admin/edit-user/:userID"
          element={
            <RouteGuard
              isPermitted={isAuthenticated}
              redirect={notAuthRedirect}
            >
              <RouteGuard
                isPermitted={currUser.isAdmin}
                redirect={AuthRedirect}
              >
                <EditPage setManagedUsers={setManagedUsers} />
              </RouteGuard>
            </RouteGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
