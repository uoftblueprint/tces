import { useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import DashboardHeaderComponent from "./header-dashboard-component";
import mockData from "./mockData";
import {
  MainContainer,
  SearchFieldContainer,
  SearchField,
  Divider,
} from "./index.styles";
import DashboardNavigationComponent from "./nav-dashboard-component";
import UpdatesCollection from "./update-collection-component";

function DashboardComponent() {
  const firstName = "First Name";

  const mockJobUpdates = mockData;

  const [jobUpdates] = useState(mockJobUpdates);

  return (
    <Container>
      <DashboardHeaderComponent userName={firstName} />
      <DashboardNavigationComponent />
      <MainContainer>
        <Typography
          variant="h5"
          gutterBottom
          align="left"
          sx={{
            paddingLeft: "20px",
          }}
        >
          Job Lead Updates
        </Typography>
        <Divider />
        {jobUpdates.length > 0 ? (
          <UpdatesCollection jobUpdates={jobUpdates} />
        ) : (
          <Box textAlign="center" sx={{ mt: 4 }}>
            <img
              src="/noJobleadUpdates.svg"
              alt="No Job Lead Updates"
              style={{ width: "50%", margin: "20px" }}
            />
          </Box>
        )}
      </MainContainer>
      <SearchFieldContainer>
        <SearchField
          fullWidth
          placeholder="Search..."
          variant="outlined"
          sx={{
            mt: 0,
            mb: 2,
            borderRadius: 0,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </SearchFieldContainer>
    </Container>
  );
}

export default DashboardComponent;
