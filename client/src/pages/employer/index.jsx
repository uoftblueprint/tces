import UserType from "../../prop-types/UserType";
import EmployerComponent from "../../components/employer-component";

function EmployerPage({ currUser }) {
  return <EmployerComponent currUser={currUser} />;
}

EmployerPage.propTypes = {
  currUser: UserType.isRequired,
};

export default EmployerPage;