import PropTypes from "prop-types";
import { Typography, Container } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import DashboardHeaderComponent from "./header-dashboard-component";
import {
  MainContainer,
  SearchFieldContainer,
  SearchField,
  Divider,
} from "./index.styles";
import DashboardNavigationComponent from "./nav-dashboard-component";
import UpdatesCollection from "./update-collection-component";
import UserType from "../../prop-types/UserType";
import JobUpdateType from "../../prop-types/JobUpdateType";
import Navbar from "../navbar-component/Navbar";

function DashboardComponent({ currUser, jobUpdates }) {
  return (
    <div>
      <Navbar isAdmin={currUser.isAdmin} />
      <Container>
        <DashboardHeaderComponent currUser={currUser} />
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
    </div>
  );
}

DashboardComponent.propTypes = {
  currUser: UserType.isRequired,
  jobUpdates: PropTypes.arrayOf(JobUpdateType).isRequired,
};

export default DashboardComponent;
