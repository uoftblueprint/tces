import PropTypes from "prop-types";
import EmployerDashboardComponent from "../../components/employer-dashboard-component";
import EmployerType from "../../prop-types/EmployerType";

function EmployerDashboard({ employers, setEmployers, getUserById }) {
  return (
    <EmployerDashboardComponent
      employers={employers}
      setEmployers={setEmployers}
      getUserById={getUserById}
    />
  );
}

EmployerDashboard.propTypes = {
  employers: PropTypes.arrayOf(EmployerType).isRequired,
  setEmployers: PropTypes.func.isRequired,
  getUserById: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default EmployerDashboard;
