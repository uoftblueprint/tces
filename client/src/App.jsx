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

// protected route wrappers
import RouteGuard from "./components/wrappers/route-guard-component";
import AuthGuard from "./components/wrappers/auth-guard-component";

// data loading wrappers
import ManagedUsersLoader from "./components/wrappers/data-loaders-wrappers/ManagedUsersLoader";
import Navbar from "./components/shared/navbar-component/Navbar";
import JobLeadDashboard from "./pages/job-lead-dashboard";
import AddJobLeadPage from "./pages/add-job-lead";
import EditJobLead from "./pages/edit-job-lead";

function App() {
  // redirect urls in-case user has a cached login or not
  const dashboardRedirect = "/dashboard";
  const adminRedirect = "/admin";

  // states defined at the very root of the react tree (will be passed down to contributing child components)
  // User State
  const [currUser, setCurrUser] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Job Updates State
  const [jobUpdates] = useState(mockJobUpdates);

  // Admin State
  const [managedUsers, setManagedUsers] = useState([]);

  // Job Leads State
  const [managedJobLeads, setManagedJobLeads] = useState([]);

  // Helper Utils

  // Get user object given user ID
  const getUserById = (userID) => {
    return managedUsers.find((user) => user.userID === userID);
  };

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
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route
          path="/signin"
          element={
            <AuthGuard
              isAuthenticated={isAuthenticated}
              loginUser={loginUser}
              redirectUrl={dashboardRedirect}
              signInRoute
            >
              <LoginPage
                setIsAuthenticated={setIsAuthenticated}
                loginUser={loginUser}
              />
            </AuthGuard>
          }
        />
        <Route path="/logout" element={<LogoutPage onLogout={resetState} />} />
        {/* Render navbar for child routes e.g dashboard, admin dashboard etc */}
        <Route element={<Navbar isAdmin={currUser.isAdmin} />}>
          <Route
            path="/dashboard"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <DashboardPage currUser={currUser} jobUpdates={jobUpdates} />
              </AuthGuard>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <RouteGuard
                  isPermitted={currUser.isAdmin}
                  redirect={dashboardRedirect}
                >
                  <ManagedUsersLoader setManagedUsers={setManagedUsers}>
                    <AdminDashboard
                      currUser={currUser}
                      managedUsers={managedUsers}
                      setManagedUsers={setManagedUsers}
                    />
                  </ManagedUsersLoader>
                </RouteGuard>
              </AuthGuard>
            }
          />
          <Route
            path="/job-leads"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <RouteGuard
                  isPermitted={currUser.isAdmin}
                  redirect={dashboardRedirect}
                >
                  <ManagedUsersLoader setManagedUsers={setManagedUsers}>
                    <JobLeadDashboard
                      managedJobLeads={managedJobLeads}
                      setManagedJobLeads={setManagedJobLeads}
                      getUserById={getUserById}
                    />
                  </ManagedUsersLoader>
                </RouteGuard>
              </AuthGuard>
            }
          />
        </Route>
        <Route
          path="/admin/create-user"
          element={
            <AuthGuard
              isAuthenticated={isAuthenticated}
              loginUser={loginUser}
              redirectUrl={adminRedirect}
            >
              <RouteGuard
                isPermitted={currUser.isAdmin}
                redirect={dashboardRedirect}
              >
                <CreatePage />
              </RouteGuard>
            </AuthGuard>
          }
        />
        <Route
          path="/admin/edit-user/:userID"
          element={
            <AuthGuard
              isAuthenticated={isAuthenticated}
              loginUser={loginUser}
              redirectUrl={adminRedirect}
            >
              <RouteGuard
                isPermitted={currUser.isAdmin}
                redirect={dashboardRedirect}
              >
                <EditPage managedUsers={managedUsers} />
              </RouteGuard>
            </AuthGuard>
          }
        />
        <Route
          path="/job-leads/:jobLeadID"
          element={
            <AuthGuard
              isAuthenticated={isAuthenticated}
              loginUser={loginUser}
              redirectUrl={adminRedirect}
            >
              <RouteGuard
                isPermitted={currUser.isAdmin}
                redirect={dashboardRedirect}
              >
                <EditJobLead managedJobLeads={managedJobLeads} />
              </RouteGuard>
            </AuthGuard>
          }
        />
        <Route
          path="/job-lead/add"
          element={
            <AuthGuard
              isAuthenticated={isAuthenticated}
              loginUser={loginUser}
              redirectUrl={adminRedirect}
            >
              <RouteGuard
                isPermitted={currUser.isAdmin}
                redirect={dashboardRedirect}
              >
                <AddJobLeadPage />
              </RouteGuard>
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
