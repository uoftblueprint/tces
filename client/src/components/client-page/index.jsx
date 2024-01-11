import { useNavigate } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export default function ClientPage() {

  const today = new Date();
  today.setMonth(today.getMonth() - 3);
  const threeMonthsAgo = today.toLocaleDateString('en-US');
  

  const clientInfo = {
    firstName: "First Name",
    email: "email@email.com",
    phone: "+1 111 111 1111",
    status: "Closed",
    closure_date: threeMonthsAgo,
  };

  const closureDate = new Date(clientInfo.closure_date);
  const currentDate = new Date();
  const timeDifference = currentDate - closureDate;
  const monthsSinceClosure = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44));

  const updatedClientInfo = {
    ...clientInfo,
    time_since_closure: `${monthsSinceClosure} Months`,
    status_at_exit: "Employed",
    status_at_3: "Employed",
    status_at_6: "Employed",
    status_at_9: "Employed",
    status_at_12: "Training",
  };

  // Just for now
  const handleDelete = () => {
    console.info("You clicked the edit icon.");
  };

  const navigate = useNavigate();

  const handleEditClick = () => {
     navigate('/edit-client-page');
   };
  

  return (
    <div style={{ marginLeft: "40px", marginRight: "40px", marginTop: "40px" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <ArrowBackIcon sx={{ color: "gray", marginRight: 2, marginLeft: 2 }} />
        <Box className="title">
          <Typography marginBottom={1} variant="h4" align="left">
            John Smith
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
                    <Avatar style={{ background: '#E53568', color: 'white' }}>
                      OP
                    </Avatar>
                  }
                  label="Owen Perth"
                  onDelete={handleDelete}
                  deleteIcon={<EditIcon />}
                />
              </Grid>
              <Grid item xs={6}>
                <Chip
                  variant="filled"
                  avatar={
                    <Avatar style={{ background: '#3568E5', color: 'white' }}>EG</Avatar>
                    
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
                <EditIcon color="default" onClick={handleEditClick}/>
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
              <Typography gutterBottom variant="body1" align="left" color={clientInfo.firstName ? "black" : "#A9A9A9"}>
							{clientInfo.firstName ? clientInfo.firstName : "Enter Name..."}
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
              <Typography gutterBottom variant="body1" align="left" color={clientInfo.email ? "black" : "#A9A9A9"}>
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
            <Typography gutterBottom variant="body1" align="left" color={clientInfo.phone ? "black" : "#A9A9A9"}>
            {clientInfo.phone ? clientInfo.phone : "Enter Phone Number..."}
						</Typography>
            </Grid>
            <Grid item xs={1} id="info-card-icon">
              <ContentCopyIcon />
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
                <Chip variant="filled" label={clientInfo.status}/>
              </Typography>
              
              </Grid>
            </Grid>
          </Box>
          <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={4}>
                <Typography gutterBottom variant="body1" align="left">
                  Closure Date
                </Typography>
              </Grid>
              <Grid item xs={8}>
              <Typography gutterBottom variant="body1" align="left" color={clientInfo.firstName ? "black" : "#A9A9A9"}>
							{clientInfo.closure_date ? clientInfo.closure_date : "Enter Closure Date..."}
						</Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider variant="middle" />
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
            <Grid container direction="row" alignItems="center">
              <Grid item xs={4}>
                <Typography gutterBottom variant="body1" align="left">
                  Time Since Closure
                </Typography>
              </Grid>
              <Grid item xs={8}>
              <Typography gutterBottom variant="body1" align="left">
							{updatedClientInfo.time_since_closure ? updatedClientInfo.time_since_closure : "Enter Time Since Closure.."}
						</Typography>
              </Grid>
            </Grid>
          </Box>
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
                <Chip variant="filled" label={updatedClientInfo.status_at_exit}/>
              </Typography>
              
              </Grid>
            </Grid>
          </Box>
          {monthsSinceClosure === 3 ? <Divider variant="middle" /> : null}
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
          {monthsSinceClosure === 3 && (
        <Grid container direction="row" alignItems="center">
          <Grid item xs={4}>
            <Typography gutterBottom variant="body1" align="left">
              Status At 3 Months
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" align="left">
              {updatedClientInfo.status_at_3}
            </Typography>
          </Grid>
        </Grid>
        
      )}
          </Box>
          {monthsSinceClosure === 6 ? <Divider variant="middle" /> : null}
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
          {monthsSinceClosure === 6 && (
        <Grid container direction="row" alignItems="center">
          <Grid item xs={4}>
            <Typography gutterBottom variant="body1" align="left">
              Status At 6 Months
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" align="left">
              <Chip variant="filled" label={updatedClientInfo.status_at_6} />
            </Typography>
          </Grid>
        </Grid>
      )}
          </Box>
          {monthsSinceClosure === 9 ? <Divider variant="middle" /> : null}
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
          {monthsSinceClosure === 9 && (
        <Grid container direction="row" alignItems="center">
          <Grid item xs={4}>
            <Typography gutterBottom variant="body1" align="left">
              Status At 9 Months
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" align="left">
              <Chip variant="filled" label={updatedClientInfo.status_at_9} />
            </Typography>
          </Grid>
        </Grid>
      )}
          </Box>
          {monthsSinceClosure === 12 && <Divider variant="middle" />}
          <Box paddingTop={2} paddingBottom={1} paddingLeft={3}>
          {monthsSinceClosure === 12 && (
        <Grid container direction="row" alignItems="center">
          <Grid item xs={4}>
            <Typography gutterBottom variant="body1" align="left">
              Status At 12 Months
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" align="left">
              <Chip variant="filled" label={updatedClientInfo.status_at_12} />
            </Typography>
          </Grid>
        </Grid>
      )}
          </Box>
          </Box>
      </Paper>
    </div>
  );
}
