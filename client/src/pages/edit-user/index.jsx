import EditComponent from "../../components/edit-user-component/edit-user-component";

function Edit({ setManagedUsers }) {
  const modifyUser = (updatedUser) => {
    setManagedUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.userID === updatedUser.userID ? updatedUser : user
      )
    );
  };

  return <EditComponent onModifyUser={modifyUser} />;
}

export default Edit;
