import PropTypes from "prop-types";
import UserType from "../../prop-types/UserType";
import EmployerComponent from "../../components/employer-component";

function EmployerPage({ getUserById, managedUsers, setSnackBarMessage }) {
  return (
    <EmployerComponent
      getUserById={getUserById}
      managedUsers={managedUsers}
      setSnackBarMessage={setSnackBarMessage}
    />
  );
}

EmployerPage.propTypes = {
  getUserById: PropTypes.func.isRequired,
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default EmployerPage;
