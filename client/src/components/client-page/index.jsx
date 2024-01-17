import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";

export default function ClientPage({ clientInfo, monthsSinceClosure }) {
  ClientPage.propTypes = {
    clientInfo: PropTypes.shape({
      firstName: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      status: PropTypes.string,
      closure_date: PropTypes.string,
      time_since_closure: PropTypes.string,
      status_at_exit: PropTypes.string,
      status_at_3: PropTypes.string,
      status_at_6: PropTypes.string,
      status_at_9: PropTypes.string,
      status_at_12: PropTypes.string,
    }).isRequired,
    monthsSinceClosure: PropTypes.number.isRequired,
  };

  // Just for now
  const handleClick = () => {
    console.info("You clicked the me.");
  };

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/edit-client-page");
  };

  // Just for now
  const handleBackClick = () => {
    navigate("/");
  };

  const handleCopyClick = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to the dashboard');
    } catch (error) {
      console.error('Error copying text to the clipboard:', error);
    }
  };

  return (
    <div style={{ marginLeft: "40px", marginRight: "40px", marginTop: "40px" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <IconButton onClick={handleBackClick} 
        sx={{ color: "gray", marginRight: 2, marginLeft: 2 }}>
        <ArrowBackIcon/>
        </IconButton>
        <Box className="title">
          <Typography marginBottom={1} variant="h4" align="left">
            {clientInfo.firstName}
          </Typography>
          <Typography variant="subtitle2" align="left">
            Client
          </Typography>
        </Box>
        <Card id="people-card" sx={{ marginLeft: "auto" }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid
                item
                xs={6}
                sx={{ textAlign: "center", fontFamily: "Arial" }}
              >
                Owner
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ textAlign: "center", fontFamily: "Arial" }}
              >
                Creator
              </Grid>

              <Grid item xs={6}>
                <Chip
                  variant="filled"
                  avatar={
                    <Avatar style={{ background: "#E53568", color: "white" }}>
                      OP
                    </Avatar>
                  }
                  label="Owen Perth"
                  onDelete={handleClick}
                  deleteIcon={<EditIcon />}
                />
              </Grid>
              <Grid item xs={6}>
                <Chip
                  variant="filled"
                  avatar={
                    <Avatar style={{ background: "#3568E5", color: "white" }}>
                      EG
                    </Avatar>
                  }
                  label="Emily Gale"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <Paper>
        <Box>
          <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={10}>
                <Typography variant="h5" align="left">
                  Personal Information
                </Typography>
              </Grid>
              <Grid item xs={1.6} align="right">
                <IconButton>
                  <EditIcon color="default" onClick={handleEditClick} />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Divider />

          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={4}>
                <Typography gutterBottom variant="body1" align="left">
                  Name
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  gutterBottom
                  variant="body1"
                  align="left"
                  color={clientInfo.firstName ? "black" : "#A9A9A9"}
                >
                  {clientInfo.firstName
                    ? clientInfo.firstName
                    : "Enter Name..."}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider variant="middle" />

          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={4}>
                <Typography gutterBottom variant="body1" align="left">
                  Email
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  gutterBottom
                  variant="body1"
                  align="left"
                  color={clientInfo.email ? "black" : "#A9A9A9"}
                >
                  {clientInfo.email ? clientInfo.email : "Enter Email..."}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={4}>
                <Typography gutterBottom variant="body1" align="left">
                  Phone Number
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography
                  gutterBottom
                  variant="body1"
                  align="left"
                  color={clientInfo.phone ? "black" : "#A9A9A9"}
                >
                  {clientInfo.phone
                    ? clientInfo.phone
                    : "Enter Phone Number..."}
                </Typography>
              </Grid>
              <Grid item xs={1} id="info-card-icon">
                <IconButton>
                <ContentCopyIcon onClick={() => handleCopyClick(clientInfo.phone)} />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={4}>
                <Typography gutterBottom variant="body1" align="left">
                  Status
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body1" align="left">
                {clientInfo.status
                    ? <Chip variant="filled" label={clientInfo.status} />
                    : "Unknown"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
            {clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Closure Date
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography gutterBottom variant="body1" align="left">
                    {clientInfo.closure_date}
                  </Typography>
                </Grid>
                <Grid item xs={1} id="info-card-icon">
                <IconButton>
                <ContentCopyIcon onClick={() => handleCopyClick(clientInfo.closure_date)} />
                </IconButton>
              </Grid>
              </Grid>
              </Box>
              </>
            )}
            {clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Time Since Closure
                  </Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography gutterBottom variant="body1" align="left">
                    {clientInfo.time_since_closure}
                  </Typography>
                </Grid>
                <Grid item xs={1} id="info-card-icon">
                <IconButton>
                <ContentCopyIcon onClick={() => handleCopyClick(clientInfo.time_since_closure)} />
                </IconButton>
              </Grid>
              </Grid>
              </Box>
              </>
            )}
            {clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At Exit
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" align="left">
                  {clientInfo.status_at_exit
                    ? <Chip variant="filled" label={clientInfo.status_at_exit} />
                    : "Unknown"}
                  </Typography>
                </Grid>
              </Grid>
              </Box>
              </>
            )}

            {monthsSinceClosure >= 3 && clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At 3 Months
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                <Typography variant="body1" align="left">
                {clientInfo.status_at_3
                    ? <Chip variant="filled" label={clientInfo.status_at_3} />
                    : "Unknown"}
                </Typography>
                </Grid>
              </Grid>
            </Box>
            </>
            )}

            {monthsSinceClosure >= 6 && clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At 6 Months
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" align="left">
                  {clientInfo.status_at_6
                    ? <Chip variant="filled" label={clientInfo.status_at_6} />
                    : "Unknown"}
                  </Typography>
                </Grid>
              </Grid>
              </Box>
              </>
            )}
            {monthsSinceClosure >= 9 && clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At 9 Months
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" align="left">
                  {clientInfo.status_at_9
                    ? <Chip variant="filled" label={clientInfo.status_at_9} />
                    : "Unknown"}
                  </Typography>
                </Grid>
              </Grid>
              </Box>
              </>
            )}
            {monthsSinceClosure >= 12 && clientInfo.status === "Closed" && (
              <>
              <Divider variant="middle" />
              <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={4}>
                  <Typography gutterBottom variant="body1" align="left">
                    Status At 12 Months
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" align="left">
                  {clientInfo.status_at_12
                    ? <Chip variant="filled" label={clientInfo.status_at_12} />
                    : "Unknown"}
                  </Typography>
                </Grid>
              </Grid>
              </Box>
              </>
            )}
          
        </Box>
      </Paper>
    </div>
  );
}
