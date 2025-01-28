import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// page components
import * as React from "react";
import DashboardPage from "./pages/dashboard";
import AdminDashboard from "./pages/admin-dashboard";
import LoginPage from "./pages/login";
import CreatePage from "./pages/create-user";
import EditPage from "./pages/edit-user";
import LogoutPage from "./pages/logout";
import ClientDashboard from "./pages/client-dashboard";
import CreateClient from "./pages/create-client";
import EmployerPage from "./pages/employer";
import UploadPage from "./pages/import";
import CommonOverlayComponent from "./components/shared/common-overlay-component";
import JobPostingsClientDashboard from "./pages/job-postings-client-dashboard";

// mock data
import mockJobUpdates from "./mock-data/mockJobUpdates";

// protected route wrappers
import RouteGuard from "./components/wrappers/route-guard-component";
import AuthGuard from "./components/wrappers/auth-guard-component";

// data loading wrappers
import Navbar from "./components/shared/navbar-component/Navbar";
import PublicNavbar from "./components/shared/navbar-component/PublicNavbar";
import JobLeadDashboard from "./pages/job-lead-dashboard";
import JobPostingsDashboard from "./pages/job-postings-dashboard";
import AddJobLeadPage from "./pages/add-job-lead";
import EditJobLead from "./pages/edit-job-lead";
import AddJobPostPage from "./pages/add-job-post";

// helper functions
import { getUserByIdHelper } from "./utils/users";
import ClientPage from "./pages/client-page";
import EmployerDashboard from "./pages/employer-dashboard";
import AddEmployerPage from "./pages/add-employer";
import Error404 from "./pages/errors/404-error";
import UserProfile from "./pages/user-profile";

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

  // Clients State
  const [managedClients, setManagedClients] = useState([]);

  // Employer State
  const [employers, setEmployers] = useState([]);

  // Common Overlay States
  const [localExitRoute, setLocalExitRoute] = React.useState(null);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");

  // Helper Utils

  // Get user object given user ID
  const getUserById = (userID) => {
    return getUserByIdHelper(managedUsers, userID);
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
        <Route
          element={
            <CommonOverlayComponent
              localExitRoute={localExitRoute}
              setLocalExitRoute={setLocalExitRoute}
              snackBarMessage={snackBarMessage}
            />
          }
        >
          <Route path="/" element={<Navigate to="/job-postings" />} />
          <Route element={<PublicNavbar />}>

          <Route
            path="/job-postings"
            element={
              <JobPostingsClientDashboard />
            }
          />
          </Route>

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
        <Route
          path="/logout"
          element={<LogoutPage onLogout={resetState} />}
        />
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
                  <AdminDashboard
                    currUser={currUser}
                    managedUsers={managedUsers}
                    setManagedUsers={setManagedUsers}
                  />
                </RouteGuard>
              </AuthGuard>
            }
          />
          <Route
            path="/admin/upload"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <RouteGuard
                  isPermitted={currUser.isAdmin}
                  redirect={dashboardRedirect}
                >
                  <UploadPage setSnackBarMessage={setSnackBarMessage} />
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
                <JobLeadDashboard
                  managedJobLeads={managedJobLeads}
                  setManagedJobLeads={setManagedJobLeads}
                  getUserById={getUserById}
                />
              </AuthGuard>
            }
          />
          <Route
            path="/employers"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <EmployerDashboard
                  employers={employers}
                  setEmployers={setEmployers}
                  getUserById={getUserById}
                />
              </AuthGuard>
            }
          />
          <Route
            path="/clients"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <ClientDashboard
                  managedClients={managedClients}
                  setManagedClients={setManagedClients}
                  getUserById={getUserById}
                />
              </AuthGuard>
            }
          />
          <Route
            path="/all-job-postings"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <JobPostingsDashboard
                  managedJobLeads={managedJobLeads}
                  setManagedJobLeads={setManagedJobLeads}
                  getUserById={getUserById}
                />
              </AuthGuard>
            }
          />
        </Route>


        {/* Render navbar for child routes that need confirm dialog e.g create job lead */}
        <Route
          element={
            <Navbar
              isAdmin={currUser.isAdmin}
              setLocalExitRoute={setLocalExitRoute}
            />
          }
        >
          <Route
            path="/job-leads/:jobLeadID"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <EditJobLead
                  managedUsers={managedUsers}
                  managedJobLeads={managedJobLeads}
                  managedClients={managedClients}
                  getUserById={getUserById}
                  setLocalExitRoute={setLocalExitRoute}
                  setSnackBarMessage={setSnackBarMessage}
                  setManagedJobLeads={setManagedJobLeads}
                  setManagedClients={setManagedClients}
                />
              </AuthGuard>
            }
          />
          <Route
            path="/job-leads/add"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <AddJobLeadPage
                  currUser={currUser}
                  setLocalExitRoute={setLocalExitRoute}
                />
              </AuthGuard>
            }
          />
          <Route
            path="/employers/:employerID"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <EmployerPage
                  getUserById={getUserById}
                  managedUsers={managedUsers}
                  managedEmployers={employers}
                  managedClients={managedClients}
                  managedJobLeads={managedJobLeads}
                  setSnackBarMessage={setSnackBarMessage}
                  setManagedEmployers={setEmployers}
                  setManagedClients={setManagedClients}
                  setManagedJobLeads={setManagedJobLeads}
                />
              </AuthGuard>
            }
          />
          <Route
            path="/employers/add"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <AddEmployerPage currUser={currUser} />
              </AuthGuard>
            }
          />
          <Route
            path="/clients/:clientID"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <ClientPage
                  managedClients={managedClients}
                  managedUsers={managedUsers}
                  getUserById={getUserById}
                  setSnackBarMessage={setSnackBarMessage}
                  setManagedClients={setManagedClients}
                />
              </AuthGuard>
            }
          />
          <Route
            path="/clients/add"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <CreateClient currUser={currUser} />
              </AuthGuard>
            }
          />
          <Route
            path="/settings"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <UserProfile currUser={currUser} />
              </AuthGuard>
            }
          />
          <Route
            path="/job-postings/add"
            element={
              <AuthGuard
                isAuthenticated={isAuthenticated}
                loginUser={loginUser}
              >
                <AddJobPostPage
                  currUser={currUser}
                  setLocalExitRoute={setLocalExitRoute}
                />
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
                <EditPage getUserById={getUserById} />
              </RouteGuard>
            </AuthGuard>
          }
        />
      </Route>
      {/* route to error 404 on invalid url */}
      <Route element={<Navbar isAdmin={currUser.isAdmin} />}>
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
    </Router >
  );
}

export default App;
