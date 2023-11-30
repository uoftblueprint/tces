import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import UserManagement from "../../components/user-management-component";
import UserType from "../../prop-types/UserType";

function AdminDashboard({ managedUsers, setManagedUsers }) {
  const [processedManagedUsers, setProcessedManagedUsers] = useState([]);

  useEffect(() => {
    const processedUsers = managedUsers.map((user) => ({
      ...user,
      id: user.userID,
      displayName: `${user.firstName} ${user.lastName}`,
    }));
    setProcessedManagedUsers(processedUsers);
  }, [managedUsers]);

  const removeUser = (userID) => {
    setManagedUsers((prevUsers) => {
      return prevUsers.filter((user) => user.userID !== userID);
    });
  };

  return (
    <UserManagement
      managedUsers={processedManagedUsers}
      removeUser={removeUser}
    />
  );
}

AdminDashboard.propTypes = {
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  setManagedUsers: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default AdminDashboard;
