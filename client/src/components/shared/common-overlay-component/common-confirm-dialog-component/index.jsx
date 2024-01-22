import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import ConfirmDialog from "../../confirm-dialog-component";

function CommonConfirmDialogComponent({ localExitRoute, setLocalExitRoute }) {
  const navigate = useNavigate();
  const [confirmDialog, setConfirmDialog] = React.useState(false);

  React.useEffect(() => {
    if (localExitRoute) {
      setConfirmDialog(true);
    }
  }, [localExitRoute]);

  const handleConfirmNav = () => {
    if (localExitRoute) {
      navigate(localExitRoute);
    }
    setLocalExitRoute(null);
    setConfirmDialog(false);
  };
  const handleCancelNav = () => {
    setConfirmDialog(false);
    setLocalExitRoute(null);
  };

  return (
    <ConfirmDialog
      open={confirmDialog}
      title="CONFIRM EXIT"
      message="Are you sure? You will lose all your unsaved progress."
      onConfirm={handleConfirmNav}
      onCancel={handleCancelNav}
    />
  );
}

CommonConfirmDialogComponent.propTypes = {
  localExitRoute: PropTypes.string.isRequired,
  setLocalExitRoute: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default CommonConfirmDialogComponent;
