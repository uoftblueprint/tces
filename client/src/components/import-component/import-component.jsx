import { useState, useEffect, useRef } from "react";
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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Grab the file
    const { files } = e.target.files;
    // Create a new FormData object
    const formData = new FormData();
    // Add the file(s) to the FormData object
    formData.append("files", files);

    // Replace url with target route
    // fetch("http://localhost:8000/create", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: userDataJSON,
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

  const fileInputRef = useRef(null);

  const handleSectionClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    // Get the file(s) from the file input
    const { files } = e.target.files;
    // Create a new FormData object
    const formData = new FormData();
    // Add the file(s) to the FormData object
    formData.append("files", files);
    // Replace url with target route
    fetch("http://localhost:8000/import", {
      method: "POST",
      body: formData,
    });
    // .then((response) => {
    //     if (response.ok) {
    //         // Handle success response (e.g., redirect or show a success message)
    //         console.log('File uploaded successfully');
    //     } else {
    //         // Handle error response (e.g., show an error message)
    //         console.error('Failed uploading file');
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
              <Upload gap={1}>
                <input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  multiple
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
              <Stack gap={1} mx={1} mt={2}>
                <Grid container spacing={2} alignItems="center" mt={1}>
                  <Grid item>
                    <UploadIcon variant="rounded" color="primary" />
                  </Grid>
                  <Grid item xs>
                    <Stack direction="column" spacing={2}>
                      <Box>
                        <Typography variant="subtitle1">
                          employers.csv
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{ color: "rgba(0, 0, 0, 0.60)" }}
                        >
                          100kb • Loading
                        </Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={progress} />
                    </Stack>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="delete">
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
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
