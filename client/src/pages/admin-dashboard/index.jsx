import PropTypes from "prop-types";
import UserManagement from "../../components/user-management-component";
import UserType from "../../prop-types/UserType";

function AdminDashboard({ managedUsers, setManagedUsers }) {
  const processedManagedUsers = managedUsers.map((user) => ({
    ...user,
    id: user.userID,
    displayName: `${user.firstName} ${user.lastName}`,
  }));

  const removeUser = (userId) => {
    setManagedUsers((prevUsers) => {
      return prevUsers.filter((user) => user.id !== userId);
    });
  };

  return (
    <UserManagement
      managedUsers={processedManagedUsers}
      onRemoveUser={removeUser}
    />
  );
}

AdminDashboard.propTypes = {
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  setManagedUsers: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default AdminDashboard;
