import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function FormSubmissionErrorDialog({ open, onBack }) {
  return (
    <Dialog
      open={open}
      onClose={onBack}
      sx={{
        "& .MuiDialog-paper": {
          borderTop: "10px solid #D32F2F",
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
        <ErrorOutlineIcon style={{ fontSize: 40, color: "#D32F2F" }} />
        <DialogTitle>
          <Typography variant="h5">
            There has been an error submitting the form
          </Typography>
        </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
          }}
        >
          <Typography
            variant="body1"
            style={{
              textAlign: "justify",
            }}
          >
            Make sure you have filled out all the necessary fields before
            submitting the form
          </Typography>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 20,
            width: "80%",
          }}
        >
          <Button onClick={onBack} variant="outlined" color="error" fullWidth>
            Back
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

FormSubmissionErrorDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default FormSubmissionErrorDialog;
