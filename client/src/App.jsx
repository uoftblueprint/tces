import "./App.css";
// import DashboardPage from "./pages/dashboard";
// import LoginPage from "./pages/login";
// import CreatePage from "./pages/create-user/create-user";
// import EditPage from "./pages/edit-user/edit-user";
// import ImportPage from "./pages/import";
import AddJobLeadPage from "./pages/add-job-lead";
import Navbar from "./components/navbar-component/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AddJobLeadPage />
    </div>
  );
}

export default App;
