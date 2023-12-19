import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import EditComponent from "../../components/edit-user-component";
import ErrorComponent from "../../components/shared/error-screen-component";
import UserType from "../../prop-types/UserType";

function Edit({ managedUsers }) {
  const errorMessage = "User to edit not found.";
  const { userID } = useParams();
  const parsedUserID = parseInt(userID, 10);
  const userToEdit = managedUsers.find((user) => user.userID === parsedUserID);

  if (!userToEdit) return <ErrorComponent message={errorMessage} />;
  return <EditComponent currUser={userToEdit} />;
}

Edit.propTypes = {
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
};

export default Edit;
