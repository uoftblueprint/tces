import PropTypes from "prop-types";
import AddJobLeadParent from "../../components/add-job-post-component/addJobLead";
import UserType from "../../prop-types/UserType";

function AddJobLeadPage({ setLocalExitRoute, currUser }) {
  return (
    <AddJobLeadParent
      setLocalExitRoute={setLocalExitRoute}
      currUser={currUser}
    />
  );
}

AddJobLeadPage.propTypes = {
  setLocalExitRoute: PropTypes.func.isRequired,
  currUser: UserType.isRequired,
};

export default AddJobLeadPage;
