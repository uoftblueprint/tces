import "./App.css";
// import ClientEntryComponent from "./components/timeline-entry-components/client-entry-component";
import EmployerEntryComponent from "./components/timeline-entry-components/employer-entry-component";
// import JobEntryComponent from "./components/timeline-entry-components/job-lead-entry-component";

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

function App() {
  const contactEntry = {
    id: 1,
    dateAdded: "2024-01-26T09:00:00.000Z",
    type: "contact",
    title: "Employee Name Contacted Client",
    body: "Sample text that mentions a name: John Smith, mentions a job posting: Receptionist #123, and contains regular text for the rest of the posting, like a note would. The text continues lorem ipsum dolor sit.",
    client: null,
    jobLead: null,
    employerContact: null,
  };

  const updateEntry = {
    id: 2,
    dateAdded: "2024-01-26T09:00:00.000Z",
    type: "update",
    title: "Employee Name Updated Email",
    body: "email@email.com",
    client: null,
    jobLead: null,
    employerContact: null,
  };

  const noteEntry = {
    id: 3,
    dateAdded: "2024-01-26T09:00:00.000Z",
    type: "note",
    title: "Employee Name Added Note",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla...",
    client: null,
    jobLead: null,
    employerContact: null,
  };

  const placementEntry = {
    id: 4,
    dateAdded: "2024-01-26T09:00:00.000Z",
    type: "placement",
    title: "Employee Name Placed Job Seeker",
    body: "John Smith was placed in Receptionist123",
    client: null,
    jobLead: null,
    employerContact: null,
  };

  const jobEntry = {
    id: 5,
    dateAdded: "2024-01-26T09:00:00.000Z",
    type: "job",
    title: "Employee Name Added Job Lead",
    body: "Receptionist123",
    client: null,
    jobLead: null,
    employerContact: null,
  };

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
                  redirectUrl={jobLeadRedirect}
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
