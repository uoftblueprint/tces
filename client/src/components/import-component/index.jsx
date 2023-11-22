import { useState, useEffect, useRef } from "react";
import { filesize } from "filesize";
import { Papa } from "papaparse";
import {
  Typography,
  Stack,
  Card,
  CardHeader,
  CardContent,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  IconButton,
  LinearProgress,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Header, Upload, UploadIcon, Cancel } from "./index.styles";

function importComponent() {
  const [menu, setMenu] = useState("");
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // const [progressArray, setProgressArray] = useState([]);

  // useEffect(() => {
  //   // Create an array with initial progress values for each file
  //   const initialProgressArray = files.map(() => 0);
  //   setProgressArray(initialProgressArray);

  //   // Start timers for each file's progress
  //   const timers = files.map((file, index) => {
  //     return setInterval(() => {
  //       setProgressArray((oldProgressArray) => {
  //         const diff = Math.random() * 10;
  //         const newProgressArray = [...oldProgressArray];
  //         newProgressArray[index] = Math.min(
  //           newProgressArray[index] + diff,
  //           100,
  //         );
  //         return newProgressArray;
  //       });
  //     }, 500);
  //   });

  //   // Cleanup function to clear all timers
  //   return () => {
  //     timers.forEach((timer) => clearInterval(timer));
  //   };
  // }, [files]);

  const fileInputRef = useRef(null);

  const handleSectionClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const uploadedFiles = event.target.files;

    // Check file size before adding to the state
    const validFiles = Array.from(uploadedFiles).filter(
      (file) => file.size <= 1024 * 1024,
    ); // 10 MB limit

    if (uploadedFiles.length > 5) {
      setError("Can only select 5 files at a time.");
    } else if (validFiles.length === uploadedFiles.length) {
      // Update state with new files
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setError(null);
    } else {
      // Set an error message for invalid file sizes
      setError("File too large (10 MB).");
    }
  };

  const handleDelete = (filename) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== filename));
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (err) => reject(err);
      reader.readAsText(file);
    });
  };

  const parseCSVToObjects = (csvContent) => {
    return new Promise((resolve, reject) => {
      Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          resolve(result.data);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedDataArray = await Promise.all(
        files.map(async (file) => {
          const data = await readFileAsText(file);
          return parseCSVToObjects(data);
        }),
      );
      console.log(parsedDataArray);
    } catch (err) {
      console.error("Error parsing CSV or sending data:", err);
      setError("Error parsing CSV or sending data");
    }

    // Replace url with target route
    // fetch("http://localhost:8000/create", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: parsedDataArray,
    // });
    // .then((response) => {
    //     if (response.ok) {
    //         // Handle success response (e.g., redirect or show a success message)
    //         console.log('Login successful');
    //     } else {
    //         // Handle error response (e.g., show an error message)
    //         console.error('Login failed');
    //     }
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack maxWidth="md" gap={4}>
        <Header>
          <Typography variant="h4">CSV File Import</Typography>
          <Typography variant="body1">
            Import CSV file with clients or employers.
          </Typography>
        </Header>

        <Card>
          <CardHeader title="Import Clients/Employers" />
          <CardContent>
            <FormControl fullWidth>
              <InputLabel id="menu">Select</InputLabel>
              <Select
                labelId="menu"
                id="menu"
                value={menu}
                label="Select"
                onChange={(e) => setMenu(e.target.value)}
                required
              >
                <MenuItem value="clients">Clients</MenuItem>
                <MenuItem value="employers">Employers</MenuItem>
              </Select>
              <FormHelperText>Required*</FormHelperText>
            </FormControl>
            <Paper
              elevation={0}
              style={{ cursor: "pointer", marginTop: "2rem" }}
              onClick={handleSectionClick}
            >
              {error && (
                <Typography
                  variant="subtitle1"
                  color="error"
                  style={{ textAlign: "center" }}
                >
                  {error}
                </Typography>
              )}
              <Upload gap={1}>
                <input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  multiple
                  required
                />
                <UploadIcon variant="rounded" color="primary" />
                <Typography variant="subtitle1">
                  <Typography
                    component="span"
                    color="primary"
                    variant="body1"
                    style={{ textDecoration: "underline" }}
                  >
                    Click to upload
                  </Typography>{" "}
                  a file
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "rgba(0, 0, 0, 0.60)" }}
                >
                  CSV file only
                </Typography>
              </Upload>
            </Paper>
            <Stack gap={1} mx={1} mt={2}>
              {files.map((file) => (
                <Grid container spacing={2} alignItems="center" mt={1}>
                  <Grid item>
                    <UploadIcon
                      variant="rounded"
                      color={error !== null ? "error" : "primary"}
                    />
                  </Grid>
                  <Grid item xs>
                    <Stack direction="column" spacing={2}>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          color={error !== null ? "error" : "primary"}
                        >
                          {error !== null ? "Upload Failed" : file.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{
                            color:
                              error !== null ? "red" : "rgba(0, 0, 0, 0.60)",
                          }}
                        >
                          {error !== null
                            ? `${error} • Failed`
                            : `${filesize(file.size, {
                                standard: "jedec",
                              })} • ${
                                progress === 100 ? "Complete" : "Loading"
                              }`}
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={progress} />
                    </Stack>
                  </Grid>
                  <Grid item>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(file.name)}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Stack>
          </CardContent>
        </Card>
        <Stack direction="row">
          <Cancel variant="outlined" size="large">
            Cancel
          </Cancel>
          <Button type="submit" variant="contained" size="large">
            Submit
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}

export default importComponent;
