import PropTypes from "prop-types";
import CreateComponent from "../../components/create-user-component";

function Create({ setManagedUsers }) {
  const getNextAvailableUserId = (managedUsers) => {
    const highestId = managedUsers.reduce((maxId, user) => {
      return user.userID > maxId ? user.userID : maxId;
    }, 0);

    return highestId + 1;
  };

  const addUser = (newUser) => {
    setManagedUsers((prevUsers) => {
      const newUserID = getNextAvailableUserId(prevUsers);
      const newUserWithID = { ...newUser, userID: newUserID };
      return [...prevUsers, newUserWithID];
    });
  };
  return <CreateComponent onAddUser={addUser} />;
}

Create.propTypes = {
  setManagedUsers: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default Create;
