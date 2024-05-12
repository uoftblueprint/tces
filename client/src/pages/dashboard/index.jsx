import PropTypes from "prop-types";
import UserType from "../../prop-types/UserType";
import JobUpdateType from "../../prop-types/JobUpdateType";
import DashboardComponent from "../../components/dashboard-component";

function Dashboard({ currUser, jobUpdates }) {
  return <DashboardComponent currUser={currUser} jobUpdates={jobUpdates} />;
}

Dashboard.propTypes = {
  currUser: UserType.isRequired,
  jobUpdates: PropTypes.arrayOf(JobUpdateType).isRequired,
};

export default Dashboard;
