// import * as React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getEmployer } from "../../utils/api";

import UserType from "../../prop-types/UserType";
import {
  EmployerContainer,
  ArrowContainer,
  MainContainer,
  Divider,
} from "./index.styles";

import EmployerInfoComponent from "./employer-info-component";
import EmployerInformationCard from "./employer-information-card";
import ContactsInformationCard from "./contacts-information-card";

function EmployerComponent({ getUserById, managedUsers, setSnackBarMessage }) {
  const navigate = useNavigate();

  // default, this gets overriden once the useEffect() finishes. to avoid a not available error.
  const [employer, setEmployer] = useState({ owner: 1, creator: 1 });

  const { employerID } = useParams();

  useEffect(() => {
    const updateEmployer = async () => {
      const res = await getEmployer(employerID);
      const json = await res.json();
      if (json.status === "success") {
        const data = json.data.employer;

        await setEmployer(data);
      }
    };
    updateEmployer();
  }, []);

  return (
    <div
      style={{
        marginTop: "20px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          marginRight: "40px",
        }}
      >
        <ArrowContainer>
          <ArrowBackIcon
            onClick={() => {
              navigate("/dashboard");
            }}
            sx={{
              color: "gray",
              marginRight: 2,
              marginLeft: 2,
              marginTop: 1,
              cursor: "pointer",
            }}
          />
        </ArrowContainer>
        <MainContainer>
          <EmployerContainer>
            <EmployerInfoComponent
              employer={employer}
              getUserById={getUserById}
              setSnackBarMessage={setSnackBarMessage}
              managedUsers={managedUsers}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gridColumnGap: "30px",
                height: 400,
                marginTop: "10px",
                width: "100%",
              }}
            >
              <EmployerInformationCard employer={employer} />

              <ContactsInformationCard />

              <Card style={{ width: "33%" }} sx={{ height: 800 }}>
                <CardContent>
                  <Typography variant="h5" align="left" gutterBottom>
                    Activity Timeline (placeholder)
                  </Typography>
                </CardContent>
                <Divider />
                <CardContent>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    Placeholder
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gridColumnGap: "30px",
                height: 400,
                marginTop: "10px",
                width: "100%",
              }}
            >
              <Card
                style={{
                  width: "66%",
                }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" align="left" gutterBottom>
                    Job Leads
                  </Typography>
                  <IconButton>
                    <AddIcon
                      sx={{
                        color: "gray",
                        cursor: "pointer",
                        align: "center",
                      }}
                    />
                  </IconButton>
                </CardContent>
                <Divider />
                <CardContent>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    <TextField
                      type="text"
                      value="aaa"
                      onChange={() => {}}
                      size="small"
                      style={{
                        borderWidth: "10px",
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => {}}>
                    Reset Filters
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </EmployerContainer>
        </MainContainer>
      </div>
    </div>
  );
}

EmployerComponent.propTypes = {
  getUserById: PropTypes.func.isRequired,
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  setSnackBarMessage: PropTypes.func.isRequired,
};

export default EmployerComponent;
