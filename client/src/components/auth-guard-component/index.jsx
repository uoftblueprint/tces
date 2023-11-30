import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreenComponent from "../loading-screen-component";
import { isUserLoggedIn } from "../../utils/api";

function AuthGuard({ children, isAuthenticated, loginUser, redirectUrl }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkUserAuth = async () => {
      if (isAuthenticated) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await isUserLoggedIn();
        const authData = await response.json();
        if (response.ok && authData.status === "success") {
          loginUser(authData.data);
          if (redirectUrl) {
            navigate(redirectUrl);
          }
        } else {
          navigate("/logout");
        }
      } catch (error) {
        navigate("/logout");
      } finally {
        setIsLoading(false);
      }
    };
    checkUserAuth();
  }, [isAuthenticated, navigate, loginUser]);

  return (
    <LoadingScreenComponent isLoading={isLoading}>
      {children}
    </LoadingScreenComponent>
  );
}

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loginUser: PropTypes.func.isRequired,
  redirectUrl: PropTypes.string,
};

AuthGuard.defaultProps = {
  redirectUrl: null,
};

export default AuthGuard;
