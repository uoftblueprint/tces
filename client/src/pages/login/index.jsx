import PropTypes from "prop-types";
import LoginComponent from "../../components/login-component";

function Login({ setIsAuthenticated }) {
  return <LoginComponent setIsAuthenticated={setIsAuthenticated} />;
}

Login.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Login;
