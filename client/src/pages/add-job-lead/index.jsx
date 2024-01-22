import PropTypes from "prop-types";
import AddJobLeadParent from "../../components/add-job-lead-component/addJobLead";
import EmployerType from "../../prop-types/EmployerType";
import UserType from "../../prop-types/UserType";

function AddJobLeadPage({ employers, setLocalExitRoute, currUser }) {
  return (
    <AddJobLeadParent
      employers={employers}
      setLocalExitRoute={setLocalExitRoute}
      currUser={currUser}
    />
  );
}

AddJobLeadPage.propTypes = {
  employers: PropTypes.arrayOf(EmployerType).isRequired,
  setLocalExitRoute: PropTypes.func.isRequired,
  currUser: UserType.isRequired,
};

export default AddJobLeadPage;
