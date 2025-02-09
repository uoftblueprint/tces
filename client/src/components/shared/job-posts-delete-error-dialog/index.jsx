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

function JobPostsDeleteErrorDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          borderTop: "5px solid #D32F2F",
          padding: "16px",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon
          style={{ fontSize: 40, color: "#D32F2F", marginBottom: 10 }}
        />
        <DialogTitle>Error Deleting Job Posting</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            We were not able to delete the job posting. Please try again later.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} variant="contained" color="error">
            Close
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

JobPostsDeleteErrorDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default JobPostsDeleteErrorDialog;
