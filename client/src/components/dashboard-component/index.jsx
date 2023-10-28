import { useState } from "react";
import { Typography, Container } from "@mui/material";
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
        <UpdatesCollection jobUpdates={jobUpdates} />
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
