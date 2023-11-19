import PropTypes from "prop-types";
import LoginComponent from "../../components/login-component";

function Login({ setIsAuthenticated, setCurrUser }) {
  const loginUser = (userData) => {
    setCurrUser({
      userID: userData.userID,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      isAdmin: userData.isAdmin ? userData.isAdmin : false,
    });
  };
  return (
    <LoginComponent
      setIsAuthenticated={setIsAuthenticated}
      loginUser={loginUser}
    />
  );
}

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  setCurrUser: PropTypes.func.isRequired,
};

export default Login;
