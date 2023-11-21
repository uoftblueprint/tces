import PropTypes from "prop-types";
import LoginComponent from "../../components/login-component";

function Login({ setIsAuthenticated, loginUser }) {
  return (
    <LoginComponent
      setIsAuthenticated={setIsAuthenticated}
      loginUser={loginUser}
    />
  );
}

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default Login;
