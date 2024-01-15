import PropTypes from "prop-types";
import AddJobLeadParent from "../../components/add-job-lead-component/addJobLead";
import UnsavedConfirmDialogComponent from "../../components/shared/unsaved-confirm-dialog-component";
import EmployerType from "../../prop-types/EmployerType";
import UserType from "../../prop-types/UserType";

function AddJobLeadPage({
  employers,
  localExitRoute,
  setLocalExitRoute,
  currUser,
}) {
  return (
    <>
      <AddJobLeadParent
        employers={employers}
        setLocalExitRoute={setLocalExitRoute}
        currUser={currUser}
      />
      <UnsavedConfirmDialogComponent
        localExitRoute={localExitRoute}
        setLocalExitRoute={setLocalExitRoute}
      />
    </>
  );
}

AddJobLeadPage.propTypes = {
  employers: PropTypes.arrayOf(EmployerType).isRequired,
  localExitRoute: PropTypes.string.isRequired,
  setLocalExitRoute: PropTypes.func.isRequired,
  currUser: UserType.isRequired,
};

export default AddJobLeadPage;
