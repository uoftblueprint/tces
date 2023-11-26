import "./App.css";
// import DashboardPage from "./pages/dashboard";
// import LoginPage from "./pages/login";
// import CreatePage from "./pages/create-user/create-user";
// import EditPage from "./pages/edit-user/edit-user";
import AddJobLeadParent from "./components/add-job-lead-component/AddJobLead";
import Navbar from "./components/navbar-component/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AddJobLeadParent />
    </div>
  );
}

export default App;
