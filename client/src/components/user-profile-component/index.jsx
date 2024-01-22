import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

export default function UserProfile() {
    
    const handleBackClick = () => {
        console.log('You clicked me');
    };


  return (
    <div style={{ marginTop: "40px" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <IconButton sx={{ color: "gray", marginRight: 2, marginLeft: 2 }}>
          <ArrowBackIcon fontSize="large" onClick={handleBackClick} />
        </IconButton>
        <Box className="title">
          <Typography
            marginBottom={1}
            variant="h4"
            align="left"
            style={{ 
            fontSize: "48px",
            fontFamily: "Arial",
            fontWeight: 545,
            lineHeight: "56px",
            }}
          >
            Your Profile
          </Typography>
        </Box>
      </div>
      <Paper style={{ marginLeft: "80px", marginRight: "80px" }}>
        <Box>
          <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={12}>
                <Typography variant="h5" align="left">
                  Personal Information
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={1}>
                <Typography gutterBottom variant="body1" align="left">
                  Name
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <Typography
                  gutterBottom
                  variant="body1"
                  align="left"
                  color="black"
                >
                  {/* {currUser.firstName} */}
                  First Last
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={1}>
                <Typography gutterBottom variant="body1" align="left">
                  Email
                </Typography>
              </Grid>
              <Grid item xs={11}>
                <Typography
                  gutterBottom
                  variant="body1"
                  align="left"
                  color="primary"
                  style={{ textDecoration: "underline" }}
                >
                  {/* {currUser.email} */}
                  email@email.com
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
