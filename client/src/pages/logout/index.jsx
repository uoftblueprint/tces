import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import LoadingComponent from "../../components/shared/loading-screen-component";
import { logout } from "../../utils/api";

function LogoutPage({ onLogout }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const logOutUser = async () => {
      try {
        await logout();
      } finally {
        onLogout();
      }
    };
    logOutUser();
    setIsLoading(false);
    navigate("/signin");
  }, [onLogout]);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <h1>Redirecting...</h1>
      </Box>
    </LoadingComponent>
  );
}

LogoutPage.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutPage;
