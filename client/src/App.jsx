import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// page components
import DashboardPage from "./pages/dashboard";
import AdminDashboard from "./pages/admin-dashboard";
import LoginPage from "./pages/login";
import CreatePage from "./pages/create-user";
import EditPage from "./pages/edit-user";
import LogoutPage from "./pages/logout";

// mock data
import mockJobUpdates from "./mock-data/mockJobUpdates";
import mockUser from "./mock-data/mockUser";
import mockManagedUsers from "./mock-data/mockManagedUsers";

// protected route wrappers
import RouteGuard from "./components/route-guard-component";
import AuthGuard from "./components/auth-guard-component";

// data loading wrappers
import ManagedUsersLoader from "./components/data-loaders-wrappers/ManagedUsersLoader";

function App() {
  // redirect urls in-case user has a cached login or not
  const notAuthRedirect = "/signin";
  const AuthRedirect = "/dashboard";

  // states defined at the very root of the react tree (will be passed down to contributing child components)
  // User State
  const [currUser, setCurrUser] = useState(mockUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Job Updates State
  const [jobUpdates] = useState(mockJobUpdates);

  // Admin State
  const [managedUsers, setManagedUsers] = useState(mockManagedUsers);

  // Reset all states (when user logs out)
  const resetState = () => {
    setCurrUser({
      userID: "",
      firstName: "",
      lastName: "",
      email: "",
      isAdmin: false,
    });
    setIsAuthenticated(false);
    setManagedUsers([]);
  };

  // Setting state (when user logs in)
  const loginUser = (userData) => {
    setCurrUser({
      userID: userData.userID || userData.user_id || 1,
      firstName: userData.firstName || userData.first_name || "",
      lastName: userData.lastName || userData.last_name || "",
      email: userData.email || userData.last_name,
      isAdmin: userData.isAdmin || userData.is_admin || false,
    });
    setIsAuthenticated(true);
  };

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
              <LoginPage
                setIsAuthenticated={setIsAuthenticated}
                loginUser={loginUser}
              />
            </RouteGuard>
          }
        />
        <Route path="/logout" element={<LogoutPage onLogout={resetState} />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard isAuthenticated={isAuthenticated} loginUser={loginUser}>
              <DashboardPage currUser={currUser} jobUpdates={jobUpdates} />
            </AuthGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthGuard isAuthenticated={isAuthenticated} loginUser={loginUser}>
              <RouteGuard
                isPermitted={currUser.isAdmin}
                redirect={AuthRedirect}
              >
                <ManagedUsersLoader
                  currUser={currUser}
                  setManagedUsers={setManagedUsers}
                >
                  <AdminDashboard
                    managedUsers={managedUsers}
                    setManagedUsers={setManagedUsers}
                  />
                </ManagedUsersLoader>
              </RouteGuard>
            </AuthGuard>
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
                <CreatePage />
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
                <EditPage />
              </RouteGuard>
            </RouteGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
