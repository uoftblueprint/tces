import "./App.css";
import DashboardPage from "./pages/dashboard";
// import LoginPage from "./pages/login";
import CreatePage from "./components/Create";
import EditPage from "./components/Edit";

function App() {
  return (
    <div className="App">
      <DashboardPage />
      <CreatePage />
      <EditPage />
    </div>
  );
}

export default App;
