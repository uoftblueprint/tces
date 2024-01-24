import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import AdminDashboardComponent from "../../components/admin-dashboard-component";
import UserType from "../../prop-types/UserType";

function AdminDashboard({ currUser, managedUsers, setManagedUsers }) {
  const [processedManagedUsers, setProcessedManagedUsers] = useState([]);
  useEffect(() => {
    const processedUsers = managedUsers
      .filter((user) => !user.isAdmin && user.email !== currUser?.email)
      .map((user) => ({
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
    <AdminDashboardComponent
      managedUsers={processedManagedUsers}
      removeUser={removeUser}
    />
  );
}

AdminDashboard.propTypes = {
  currUser: UserType.isRequired,
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  setManagedUsers: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default AdminDashboard;
