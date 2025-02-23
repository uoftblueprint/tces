import PropTypes from "prop-types";
import AddJobPostParent from "../../components/job-postings-dashboard-component/editJobPosting";
import UserType from "../../prop-types/UserType";

function EditJobPost({ setLocalExitRoute, currUser }) {
  return (
    <AddJobPostParent
      setLocalExitRoute={setLocalExitRoute}
      currUser={currUser}
    />
  );
}
EditJobPost.propTypes = {
  setLocalExitRoute: PropTypes.func.isRequired,
  currUser: UserType.isRequired,
};

export default EditJobPost;
