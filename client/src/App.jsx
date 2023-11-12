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
import LoginPage from "./pages/login";
// import CreatePage from "./pages/create-user/create-user";
// import EditPage from "./pages/edit-user/edit-user";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const redirect = "/signin";

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
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/dashboard"
          element={
            <RouteGuard isPermitted={isAuthenticated} redirect={redirect}>
              <DashboardPage />
            </RouteGuard>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
