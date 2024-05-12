import CreateClientComponent from "../../components/create-client-component/create-client-component";
import UserType from "../../prop-types/UserType";

function CreateClient({ currUser }) {
  return <CreateClientComponent currUser={currUser} />;
}

CreateClient.propTypes = {
  currUser: UserType.isRequired,
};

export default CreateClient;
