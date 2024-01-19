import "./App.css";
import ClientTable from "./pages/client-table";
import Navbar from "./components/navbar-component/Navbar";
// import DashboardPage from "./pages/dashboard";
// import LoginPage from "./pages/login";
// import CreatePage from "./pages/create-user/create-user";
// import EditPage from "./pages/edit-user/edit-user";
// import ImportPage from "./pages/import";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ClientTable />
    </div>
  );
}

export default App;
