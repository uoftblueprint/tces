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
import CommonOverlayComponent from "./components/shared/common-overlay-component";

// mock data
import mockJobUpdates from "./mock-data/mockJobUpdates";

// protected route wrappers
import RouteGuard from "./components/wrappers/route-guard-component";
import AuthGuard from "./components/wrappers/auth-guard-component";

// data loading wrappers
import ManagedUsersLoader from "./components/wrappers/data-loaders-wrappers/ManagedUsersLoader";
import EmployersLoader from "./components/wrappers/data-loaders-wrappers/EmployersLoader";
import Navbar from "./components/shared/navbar-component/Navbar";
import JobLeadDashboard from "./pages/job-lead-dashboard";
import AddJobLeadPage from "./pages/add-job-lead";
import EditJobLead from "./pages/edit-job-lead";

// helper functions
import { getUserByIdHelper } from "./utils/users";
import getEmployerByIdHelper from "./utils/employers";
import ManagedJobLeadsLoader from "./components/wrappers/data-loaders-wrappers/ManagedJobLeadsLoader";
import ClientPage from "./pages/client-page";
import EmployerDashboard from "./pages/employer-dashboard";
import AddEmployerPage from "./pages/add-employer";

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

  // Get employer object given employer ID
  const getEmployerById = (employerID) => {
    return getEmployerByIdHelper(employers, employerID);
  };

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
                  <ManagedUsersLoader setManagedUsers={setManagedUsers}>
                    <JobLeadDashboard
                      managedJobLeads={managedJobLeads}
                      setManagedJobLeads={setManagedJobLeads}
                      getUserById={getUserById}
                    />
                  </ManagedUsersLoader>
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
                  <ManagedUsersLoader setManagedUsers={setManagedUsers}>
                    <EmployerDashboard
                      employers={employers}
                      setEmployers={setEmployers}
                      getUserById={getUserById}
                    />
                  </ManagedUsersLoader>
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
                  <ManagedUsersLoader setManagedUsers={setManagedUsers}>
                    <ClientDashboard
                      managedClients={managedClients}
                      setManagedClients={setManagedClients}
                      getUserById={getUserById}
                    />
                  </ManagedUsersLoader>
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
                  <ManagedJobLeadsLoader
                    setManagedJobLeads={setManagedJobLeads}
                  >
                    <ManagedUsersLoader setManagedUsers={setManagedUsers}>
                      <EmployersLoader setEmployers={setEmployers}>
                        <EditJobLead
                          managedUsers={managedUsers}
                          managedJobLeads={managedJobLeads}
                          getEmployerById={getEmployerById}
                          getUserById={getUserById}
                          setLocalExitRoute={setLocalExitRoute}
                          setSnackBarMessage={setSnackBarMessage}
                        />
                      </EmployersLoader>
                    </ManagedUsersLoader>
                  </ManagedJobLeadsLoader>
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
                  <EmployersLoader setEmployers={setEmployers}>
                    <AddJobLeadPage
                      employers={employers}
                      currUser={currUser}
                      setLocalExitRoute={setLocalExitRoute}
                    />
                  </EmployersLoader>
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
                  <EmployersLoader setEmployers={setEmployers}>
                    <AddEmployerPage currUser={currUser} />
                  </EmployersLoader>
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
                  <ManagedUsersLoader setManagedUsers={setManagedUsers}>
                    <ClientPage
                      managedUsers={managedUsers}
                      getUserById={getUserById}
                      setSnackBarMessage={setSnackBarMessage}
                    />
                  </ManagedUsersLoader>
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
      </Routes>
    </Router>
  );
}

export default App;
