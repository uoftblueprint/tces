import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

function RouteGuard({ children, isPermitted, redirect }) {
  if (!isPermitted) {
    return <Navigate to={redirect} />;
  }
  return children;
}

RouteGuard.propTypes = {
  children: PropTypes.node.isRequired,
  isPermitted: PropTypes.bool.isRequired,
  redirect: PropTypes.string.isRequired,
};

export default RouteGuard;
