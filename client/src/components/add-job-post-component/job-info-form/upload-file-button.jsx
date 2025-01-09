import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { Box, Typography, LinearProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";

// Define custom styles
const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: 0,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  icon: {
    display: "none !important",
  },
});

export default function FileUploadButton() {
  // ! Later on, implement prop drilling once the main page is complete.

  const classes = useStyles();
  const [file, setFile] = useState(null); // State for the uploaded file
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [fileError, setFileError] = useState(""); // Track file size error
  const [dropzoneKey, setDropzoneKey] = useState(0); // Force re-render of DropzoneArea

  // Handle file selection
  const handleFileChange = (selectedFiles) => {
    console.log("Files selected from DropzoneArea:", selectedFiles);

    if (!selectedFiles || selectedFiles.length === 0) {
      console.error("No files selected.");
      return;
    }

    const maxSize = 5000000; // 5 MB
    const selectedFile = selectedFiles[0]; // Only take the first file

    if (selectedFile.size > maxSize) {
      console.error("File too large:", selectedFile.name);
      setFileError(
        `The file "${selectedFile.name}" is too large. Maximum size is 5 MB.`,
      );
      setFile(null); // Clear the file from state
      setUploadProgress(0);
      return;
    }

    setFileError(""); // Clear any existing error message
    setFile(selectedFile); // Store the single file

    // Initialize upload progress for the new file
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const progress = prev + 10;
        if (progress >= 100) {
          clearInterval(interval); // Clear interval when progress reaches 100%
        }
        return Math.min(progress, 100);
      });
    }, 500);
  };

  // Remove the file
  const handleRemoveFile = () => {
    console.log("Removing file:", file?.name);

    // Clear the file and its progress
    setFile(null);
    setUploadProgress(0);
    setFileError(""); // Clear any error message

    // Reset DropzoneArea to clear its internal state
    setDropzoneKey((prevKey) => prevKey + 1);
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 4,
        p: 2,
        border: "1px dashed #ccc",
        borderRadius: 2,
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      {/* DropzoneArea */}
      <DropzoneArea
        key={dropzoneKey} // Add key to force re-render
        acceptedFiles={["application/pdf"]}
        onChange={(selectedFiles) => {
          console.log(
            "DropzoneArea triggered onChange with files:",
            selectedFiles,
          );
          handleFileChange(selectedFiles); // Pass files to handler
        }}
        dropzoneText={
          <div style={{ marginBottom: 0 }}>
            <div
              style={{
                backgroundColor: "rgba(53, 104, 229, 0.1)",
                borderRadius: "50%",
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 8px",
              }}
            >
              <img
                src="upload-icon.png"
                alt="upload icon"
                style={{ width: 24, height: 24 }}
              />
            </div>
            <span style={{ fontSize: "16px", fontWeight: 600 }}>
              <span
                style={{
                  color: "#3568E5",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Click to upload
              </span>{" "}
              a file
            </span>
            <div
              style={{
                color: "#666",
                fontSize: "14px",
                marginTop: 4,
                marginBottom: 0,
              }}
            >
              PDF file only
            </div>
          </div>
        }
        filesLimit={1} // Allow only one file
        maxFileSize={5000000} // 5 MB
        showPreviews={false} // Remove default previews
        showPreviewsInDropzone={false} // Disable previews in dropzone
        classes={{
          root: classes.root,
          icon: classes.icon,
        }}
        showAlerts={false}
      />

      {/* Error Message */}
      {fileError && (
        <Typography variant="body2" color="red" sx={{ mt: 2 }}>
          {fileError}
        </Typography>
      )}

      {/* Uploaded File */}
      {file && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            borderBottom: "1px solid #ccc",
            pb: 1,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{file.name}</Typography>
            <LinearProgress
              variant="determinate"
              value={uploadProgress || 0}
              sx={{ mt: 1 }}
            />
            {uploadProgress === 100 && (
              <Typography variant="body2" color="green" sx={{ mt: 1 }}>
                Upload complete
              </Typography>
            )}
          </Box>
          <IconButton onClick={handleRemoveFile}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
