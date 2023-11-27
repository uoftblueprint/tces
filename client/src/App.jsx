import "./App.css";
// import DashboardPage from "./pages/dashboard";
// import DashboardPage from "./pages/dashboard";
// import LoginPage from "./pages/login";
// import CreatePage from "./pages/create-user/create-user";
// import EditPage from "./pages/edit-user/edit-user";
// import ImportPage from "./pages/import";
import Navbar from "./components/navbar-component/Navbar";
import AddEmployerPage from "./pages/add-employer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AddEmployerPage />
    </div>
  );
}

export default App;
