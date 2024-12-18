import PropTypes from "prop-types";
import AddJobPostParent from "../../components/add-job-post-component/addJobPosting";
import UserType from "../../prop-types/UserType";

function AddJobPostPage({ setLocalExitRoute, currUser }) {
  return (
    <AddJobPostParent
      setLocalExitRoute={setLocalExitRoute}
      currUser={currUser}
    />
  );
}

AddJobPostPage.propTypes = {
  setLocalExitRoute: PropTypes.func.isRequired,
  currUser: UserType.isRequired,
};

export default AddJobPostPage;
