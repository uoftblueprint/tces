import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import { Snackbar } from "@mui/material";
import * as React from "react";
import CommonConfirmDialogComponent from "./common-confirm-dialog-component";

function CommonOverlayComponent({
  localExitRoute,
  setLocalExitRoute,
  snackBarMessage,
}) {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  React.useEffect(() => {
    if (snackBarMessage) {
      setSnackbarOpen(true);
    }
  }, [snackBarMessage]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <CommonConfirmDialogComponent
        localExitRoute={localExitRoute}
        setLocalExitRoute={setLocalExitRoute}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
        message={snackBarMessage}
      />

      <Outlet />
    </>
  );
}

CommonOverlayComponent.propTypes = {
  localExitRoute: PropTypes.string,
  setLocalExitRoute: PropTypes.func,
  snackBarMessage: PropTypes.string,
};

CommonOverlayComponent.defaultProps = {
  localExitRoute: "",
  setLocalExitRoute: null,
  snackBarMessage: "",
};

export default CommonOverlayComponent;
