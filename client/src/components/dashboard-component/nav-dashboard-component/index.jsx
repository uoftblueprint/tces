import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import WorkIcon from "@mui/icons-material/Work";
import { NavigationContainer, MainNavButton } from "./index.styles";

function DashboardNavigationComponent() {
  const navigate = useNavigate();
  return (
    <NavigationContainer
      $sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <MainNavButton
            variant="contained"
            startIcon={<PeopleIcon />}
            iconbackgroundcolour="#3568E5"
          >
            My Clients
          </MainNavButton>
        </Grid>
        <Grid item xs={12} sm={4}>
          <MainNavButton
            variant="contained"
            startIcon={<StarIcon />}
            iconbackgroundcolour="#1AA66A"
            onClick={() => navigate("/job-leads/")}
          >
            Job Leads
          </MainNavButton>
        </Grid>
        <Grid item xs={12} sm={4}>
          <MainNavButton
            variant="contained"
            startIcon={<WorkIcon />}
            iconbackgroundcolour="#E53568"
          >
            Employers
          </MainNavButton>
        </Grid>
      </Grid>
    </NavigationContainer>
  );
}

export default DashboardNavigationComponent;
