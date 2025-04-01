import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

function SuccessfulFormSubmissionDialog({ open, onBack }) {
  return (
    <Dialog
      open={open}
      onClose={onBack}
      sx={{
        "& .MuiDialog-paper": {
          borderTop: "10px solid #1AA66A",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 20,
          width: "100%",
        }}
      >
        <CheckCircleOutlineIcon style={{ fontSize: 40, color: "#1AA66A" }} />
        <DialogTitle>
          <Typography variant="h5">Your application was saved</Typography>
        </DialogTitle>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 20,
            width: "80%",
          }}
        >
          <Button onClick={onBack} variant="outlined" color="success" fullWidth>
            Back
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

SuccessfulFormSubmissionDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default SuccessfulFormSubmissionDialog;
