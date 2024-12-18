import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import WorkIcon from "@mui/icons-material/Work";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import InboxIcon from "@mui/icons-material/Inbox";
import { NavigationContainer, MainNavButton } from "./index.styles";

function DashboardNavigationComponent() {
  const navigate = useNavigate();
  return (
    <NavigationContainer
      $sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Grid container spacing={2} justifyContent="center" direction="row">
        <Grid item xs={14} sm={2.25}>
          <MainNavButton
            variant="contained"
            startIcon={<PeopleIcon />}
            iconbackgroundcolour="#3568E5"
            onClick={() => navigate("/clients/")}
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            Clients
          </MainNavButton>
        </Grid>
        <Grid item xs={14} sm={2.25}>
          <MainNavButton
            variant="contained"
            startIcon={<StarIcon />}
            iconbackgroundcolour="#1AA66A"
            onClick={() => navigate("/job-leads/")}
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            Job Leads
          </MainNavButton>
        </Grid>
        <Grid item xs={14} sm={2.25}>
          <MainNavButton
            variant="contained"
            startIcon={<WorkIcon />}
            iconbackgroundcolour="#E53568"
            onClick={() => navigate("/employers/")}
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            Employers
          </MainNavButton>
        </Grid>
        <Grid item xs={14} sm={2.25}>
          <MainNavButton
            variant="contained"
            startIcon={<ContentPasteIcon />}
            iconbackgroundcolour="#9F4DB7"
            onClick={() => navigate("/job-postings/")}
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            Job Postings
          </MainNavButton>
        </Grid>
        <Grid item xs={14} sm={2.25}>
          <MainNavButton
            variant="contained"
            startIcon={<InboxIcon />}
            iconbackgroundcolour="#F4B73F"
            onClick={() => navigate("/job-apps/")}
            sx={{
              whiteSpace: "nowrap",
            }}
          >
            Job Apps
          </MainNavButton>
        </Grid>
      </Grid>
    </NavigationContainer>
  );
}

export default DashboardNavigationComponent;
