import { Button, Typography, Container, Box, Grid } from "@mui/material";

function Dashboard() {
  const firstName = "Kevin Le";
  return (
    <Container>
      <Box my={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" gutterBottom>
              {"Welcome Back, "} {firstName}!
            </Typography>
            <Typography variant="body1" gutterBottom>
              Start a search, add a new entry using the button or browse through
              the timelines.
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Add New Entry
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Dashboard;
