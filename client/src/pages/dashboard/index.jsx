import {
  ButtonGroup,
  Button,
  Typography,
  Container,
  Box,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Dashboard() {
  const firstName = "Kevin Le";
  return (
    <Container>
      <Box my={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom align="left">
              {"Welcome Back, "} {firstName}!
            </Typography>

            <Typography variant="body1" gutterBottom align="left">
              Start a search, add a new entry using the button or browse through
              the timelines.
            </Typography>
          </Grid>
          <Grid item>
            <Grid item>
              <ButtonGroup
                variant="contained"
                color="primary"
                aria-label="split button"
              >
                <Button startIcon={<AddIcon />}>Add New Entry</Button>
                <Button>
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;
