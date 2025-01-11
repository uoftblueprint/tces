import React, { useState } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import { Box, Typography, LinearProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileUploadIcon from "@mui/icons-material/FileUpload";
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
  const classes = useStyles();
  const [file, setFile] = useState(null); // State for the uploaded file
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [fileError, setFileError] = useState(""); // Track file size error
  const [dropzoneKey, setDropzoneKey] = useState(0); // Force re-render of DropzoneArea

  // Handle file selection
  const handleFileChange = (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }

    const maxSize = 5000000; // 5 MB
    const selectedFile = selectedFiles[0]; // Only take the first file

    if (selectedFile.size > maxSize) {
      setFileError(`upload failed: file too big`);
      setFile(selectedFile); // Keep the file for displaying error
      setUploadProgress(0);
      return;
    }

    setFileError(""); // Clear any existing error message
    setFile(selectedFile); // Store the single file
    setUploadProgress(0); // Reset upload progress

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const progress = prev + 10;
        if (progress >= 100) {
          clearInterval(interval); // Clear interval when progress reaches 100%
          uploadFile(selectedFile); // Call the upload function once progress completes
        }
        return Math.min(progress, 100);
      });
    }, 500);
  };

  // Upload file to server
  const uploadFile = async (fileToUpload) => {
    const formData = new FormData();
    formData.append("file", fileToUpload);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("File upload failed", response.statusText);
        setFileError("upload failed: server error");
      }
    } catch (error) {
      console.error("Error uploading file", error);
      setFileError("upload failed: network error");
    }
  };

  // Format file size
  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1048576).toFixed(1)} MB`;
  };

  // Remove the file
  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setFileError("");
    setDropzoneKey((prevKey) => prevKey + 1); // Reset DropzoneArea
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
        onChange={handleFileChange}
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
                style={{ width: 48, height: 48 }}
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
        maxFileSize={null} // No size limit temporarily
        showPreviews={false} // Remove default previews
        showPreviewsInDropzone={false} // Disable previews in dropzone
        classes={{
          root: classes.root,
          icon: classes.icon,
        }}
        showAlerts={false}
      />

      {/* Uploaded File */}
      {file && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            p: 1,
            border: "1px solid #e0e0e0",
            borderRadius: 1,
            backgroundColor: fileError ? "#ffebee" : "#f5f5f5",
          }}
        >
          {/* File Icon */}
          <Box sx={{ mr: 2 }}>
            {fileError ? (
              <ErrorIcon color="error" />
            ) : uploadProgress === 100 ? (
              <CheckCircleIcon color="success" />
            ) : (
              <FileUploadIcon color="primary" />
            )}
          </Box>

          {/* File Details */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {file.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {formatFileSize(file.size)} •{" "}
              {fileError ||
                (uploadProgress === 100 ? "Complete" : "Uploading...")}
            </Typography>
            {!fileError && (
              <LinearProgress
                variant="determinate"
                value={uploadProgress || 0}
                sx={{ mt: 1 }}
              />
            )}
          </Box>

          {/* Delete Button */}
          <IconButton onClick={handleRemoveFile}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
