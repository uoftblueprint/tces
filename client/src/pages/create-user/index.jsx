import CreateComponent from "../../components/create-user-component/create-user-component";

function Create({ setManagedUsers }) {
  const addUser = (newUser) => {
    setManagedUsers((prevUsers) => [...prevUsers, newUser]);
  };
  return <CreateComponent onAddUser={addUser} />;
}

export default Create;
