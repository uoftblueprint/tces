import AddEmployer from "../../components/add-employer-component/addEmployer";
import UserType from "../../prop-types/UserType";

function AddEmployerPage({currUser}) {
  return <AddEmployer currUser={currUser} />;
}

AddEmployerPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currUser: UserType.isRequired,
};

export default AddEmployerPage;
