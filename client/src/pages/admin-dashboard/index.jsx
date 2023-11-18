import UserManagement from "../../components/user-management-component";

function AdminDashboard({ managedUsers, setManagedUsers }) {
  const removeUser = (userId) => {
    setManagedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };

  return (
    <UserManagement managedUsers={managedUsers} onRemoveUser={removeUser} />
  );
}

export default AdminDashboard;
