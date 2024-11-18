import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  TextField,
  FormHelperText,
  Typography,
} from "@mui/material";
import { ButtonL, JobLeadContainer, H3 } from "../index.styles";
import styles from "./index.module.css";

function AddApplicationFields() {
  return (
    <>
      <JobLeadContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <H3 style={{ paddingLeft: "2%" }}>Application form fields</H3>
        </div>

        <Container
          disableGutters
          maxWidth={false}
          sx={{
            display: "flex",
            paddingLeft: 0,
            alignItems: "top",
            justifyContent: "center",
            flexFlow: "wrap",
          }}
        >
          {/* Name Field */}
          <TextField
            disabled
            fullWidth
            className={styles.dotted}
            sx={{ m: 1, width: "47%" }}
            label="Name"
            helperText="*Required"
            required
            InputLabelProps={{ required: false }}
          />

          {/* Email Field */}
          <TextField
            disabled
            fullWidth
            className={styles.dotted}
            sx={{ m: 1, width: "47%" }}
            label="Email Address"
            helperText="*Required"
            required
            InputLabelProps={{ required: false }}
          />

          {/* Phone Field */}
          <TextField
            disabled
            fullWidth
            className={styles.dotted}
            sx={{ m: 1, width: "47%" }}
            label="Phone"
            helperText="*Required"
            required
            InputLabelProps={{ required: false }}
          />

          {/* Postal Code Field */}
          <TextField
            disabled
            fullWidth
            className={styles.dotted}
            sx={{ m: 1, width: "47%" }}
            label="Postal Code"
            helperText="*Required"
            required
            InputLabelProps={{ required: false }}
          />

          {/* Status In Canada Field */}
          <FormControl disabled fullWidth sx={{ m: 1, width: "96%" }}>
            <InputLabel>Status In Canada</InputLabel>
            <Select className={styles.dotted} required />
            <FormHelperText>*Required</FormHelperText>
          </FormControl>

          {/* Dummy resume upload Field */}
          <Box sx={{ margin: "8px", width: "96%" }}>
            <Typography color="#9E9E9E" pb="13px">
              *Upload Resume
            </Typography>
            <Container
              maxWidth={false}
              sx={{
                border: "1px dashed #E0E0E0",
                borderRadius: "15px",
                color: "#AAAFBA",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "30px 0",
              }}
            >
              <Container sx={{ width: "auto" }}>
                <IconButton sx={{ backgroundColor: "#E6ECFB" }}>
                  <UploadFileIcon />
                </IconButton>
              </Container>
              <Typography variant="body1" pb="10px" pt="10px">
                <span className={styles.underline}>Click to upload</span>
                &nbsp;or drag and drop
              </Typography>
              <Typography variant="body2">PDF (max. 3MB)</Typography>
            </Container>
          </Box>
        </Container>
      </JobLeadContainer>

      {/* Add specific behaviour when design P2 completed */}
      <ButtonL
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        + Add job-specific fields
      </ButtonL>
    </>
  );
}

export default AddApplicationFields;
