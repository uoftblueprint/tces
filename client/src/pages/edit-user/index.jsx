import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import EditComponent from "../../components/edit-user-component";

function Edit({ setManagedUsers }) {
  const { userID } = useParams();
  const parsedUserID = parseInt(userID, 10);

  const modifyUser = (updatedUser) => {
    setManagedUsers((prevUsers) => {
      return prevUsers.map((user) => {
        return user.userID === updatedUser.userID ? updatedUser : user;
      });
      // eslint-disable-next-line
    });
  };

  return <EditComponent userID={parsedUserID} onModifyUser={modifyUser} />;
}

Edit.propTypes = {
  setManagedUsers: PropTypes.func.isRequired,
};

export default Edit;
