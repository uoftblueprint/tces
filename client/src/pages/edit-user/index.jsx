import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import EditComponent from "../../components/edit-user-component";
import ErrorComponent from "../../components/shared/error-screen-component";

function Edit({ getUserById }) {
  const errorMessage = "User to edit not found.";
  const { userID } = useParams();
  const parsedUserID = parseInt(userID, 10);
  const userToEdit = getUserById(parsedUserID);


  if (!userToEdit) return <ErrorComponent message={errorMessage} />;
  return <EditComponent currUser={userToEdit} />;
}

Edit.propTypes = {
  getUserById: PropTypes.func.isRequired,
};

export default Edit;
