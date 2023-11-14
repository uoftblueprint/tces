import "./App.css";
// import DashboardPage from "./pages/dashboard";
// import DashboardPage from "./pages/dashboard";
// import LoginPage from "./pages/login";
// import CreatePage from "./pages/create-user/create-user";
// import EditPage from "./pages/edit-user/edit-user";
// import AddJobLead from "./components/add-job-lead-component";
import AddCompanyInfo from "./components/add-employer-component/company-info-component";
import AddJobLead from "./components/add-job-lead-component";
import AddEmployer from "./components/add-employer-component";

function App() {
  return (
    <div className="App">
      <AddCompanyInfo />
      <AddJobLead />
      <AddEmployer />
    </div>
  );
}

export default App;
