import { useState, useEffect, useRef } from "react";
import { filesize } from "filesize";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Section, Header, Upload, UploadIcon, Cancel } from "./index.styles";
import { uploadEmployers, uploadClientsAndContacts } from "../../utils/api";
import ErrorScreenComponent from "../shared/error-screen-component";

function ImportComponent({ setSnackBarMessage }) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorObj, setErrorObj] = useState(null);

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

  const fileInputRef = useRef(null);

  const handleSectionClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleDelete = () => {
    setFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (menu === "clients_and_contacts") {
      try {
        const response = await uploadClientsAndContacts(file);

        if (response.ok) {
          navigate(-1);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await uploadEmployers(file);

        if (response.ok) {
          navigate(-1);
        } else {
          setSnackBarMessage("Error uploading file");
        }
      } catch (error) {
        setErrorObj(error);
      }
    }
    setLoading(false);
  };

  if (errorObj) return <ErrorScreenComponent message={errorObj.message} />;

  return (
    <Section>
      <form
        onSubmit={handleSubmit}
        style={{ margin: "5rem 0" }}
        encType="multipart/form-data"
        method="post"
      >
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
                  <MenuItem value="clients_and_contacts">
                    Clients and Contacts
                  </MenuItem>
                  <MenuItem value="employers">Employers</MenuItem>
                </Select>
                <FormHelperText>Required*</FormHelperText>
              </FormControl>
              <Paper
                elevation={0}
                style={{ cursor: "pointer", marginTop: "2rem" }}
                onClick={handleSectionClick}
              >
                {!file && (
                  <Upload gap={1}>
                    <input
                      type="file"
                      accept=".csv"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleFileChange}
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
                )}
              </Paper>
              <Stack gap={1} mx={1} mt={2}>
                {file && (
                  <Grid container spacing={2} alignItems="center" mt={1}>
                    <Grid item>
                      <UploadIcon variant="rounded" color="primary" />
                    </Grid>
                    <Grid item xs>
                      <Stack direction="column" spacing={2}>
                        <Box>
                          <Typography variant="subtitle1" color="primary">
                            {file.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{
                              color: "rgba(0, 0, 0, 0.60)",
                            }}
                          >
                            {`${filesize(file.size, { round: 0 })} • ${
                              progress === 100 ? "Complete" : "Loading"
                            }`}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                        />
                      </Stack>
                    </Grid>
                    <Grid item>
                      <IconButton aria-label="delete" onClick={handleDelete}>
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                )}
              </Stack>
            </CardContent>
          </Card>
          <Stack direction="row">
            <Cancel
              variant="outlined"
              size="large"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </Cancel>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Section>
  );
}

ImportComponent.propTypes = {
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default ImportComponent;
