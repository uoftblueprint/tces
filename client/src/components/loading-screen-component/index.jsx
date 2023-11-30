import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function LoadingScreenComponent({ children, isLoading }) {
  if (isLoading) {
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress />
    </Box>;
  } else {
    return (
      children || (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <CircularProgress />
        </Box>
      )
    );
  }
}

LoadingScreenComponent.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool.isRequired,
};

LoadingScreenComponent.defaultProps = {
  children: null,
};

export default LoadingScreenComponent;
