import "./App.css";
// import DashboardPage from "./pages/dashboard";
// import DashboardPage from "./pages/dashboard";
// import LoginPage from "./pages/login";
// import CreatePage from "./pages/create-user/create-user";
// import EditPage from "./pages/edit-user/edit-user";
// import AddJobLead from "./components/add-job-lead-component";
import AddCompanyInfo from "./components/add-employer-component/company-info-component";
// import AddEmployerJobLead from "./components/add-employer-component/job-lead-component";
import Navbar from "./components/navbar-component/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AddCompanyInfo />
    </div>
  );
}

export default App;
