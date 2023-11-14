import { 
  BrowserRouter as Router, 
  Routes, 
  Route 
} from "react-router-dom";
import AddCompanyInfo from "./company-info-component";
import AddEmployerInfo from "./employer-contact-component";
import AddEmployerJobLead from "./job-lead-component";

function AddEmployer() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AddCompanyInfo />} />
        <Route exact path="/employer-contacts" element={<AddEmployerInfo />} />
        <Route
          exact
          path="/employer-job-leads"
          element={<AddEmployerJobLead />}
        />
      </Routes>
    </Router>
  );
}

export default AddEmployer;
