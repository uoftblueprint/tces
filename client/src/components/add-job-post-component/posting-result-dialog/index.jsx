import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PropTypes from "prop-types";

function PostingResultDialog({
  isOpen,
  isSuccess,
  handleClose,
  message,
  subMessage,
  buttonMessage,
}) {
  const themeColor = isSuccess ? "#1AA66A" : "#D32F2F";
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      sx={{
        borderRadius: "10px",
      }}
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          borderTop: `10px solid ${themeColor}`,
          padding: "15px 50px 30px",
          gap: "20px",
          maxWidth: "225px",
        }}
      >
        {isSuccess ? (
          <CheckCircleOutlineIcon sx={{ color: themeColor }} />
        ) : (
          <ErrorOutlineIcon sx={{ color: themeColor }} />
        )}
        <DialogContentText sx={{ color: "black" }}>
          <Typography>{message}</Typography>
          {subMessage && <Typography>{subMessage}</Typography>}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          padding: "0 20px 20px",
        }}
      >
        <Button
          onClick={handleClose}
          autoFocus
          variant="outlined"
          sx={{
            width: "1",
            color: themeColor,
            borderColor: themeColor,
            borderRadius: "10px",
          }}
        >
          {buttonMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PostingResultDialog.defaultProps = {
  subMessage: "",
};

PostingResultDialog.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isOpen: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  subMessage: PropTypes.string,
  buttonMessage: PropTypes.string.isRequired,
};

export default PostingResultDialog;
