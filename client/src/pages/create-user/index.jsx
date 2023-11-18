import PropTypes from "prop-types";
import CreateComponent from "../../components/create-user-component";

function Create({ setManagedUsers }) {
  const addUser = (newUser) => {
    setManagedUsers((prevUsers) => [...prevUsers, newUser]);
  };
  return <CreateComponent onAddUser={addUser} />;
}

Create.propTypes = {
  setManagedUsers: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default Create;
