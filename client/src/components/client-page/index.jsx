// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export default function ClientPage() {
  const userInfo = {
    firstName: "First Last",
    email: "email@email.com",
    phone: "+1 111 111 1111",
    status: "Active"
  };

  // Just for now
  const handleDelete = () => {
    console.info("You clicked the edit icon.");
  };

  return (
    <div style={{ marginLeft: "40px", marginRight: "40px" }}>
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
                  variant="outlined"
                  avatar={
                    <Avatar
                      sx={{
                        background: "#E53568",
                        color: "#FFFFFF",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
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
                  variant="outlined"
                  avatar={
                    <Avatar sx={{ background: "blue", color: "white" }}>
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
                <EditIcon color="primary" />
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
              <Typography gutterBottom variant="body1" align="left">
							{userInfo.firstName}
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
              <Typography gutterBottom variant="body1" align="left">
							{userInfo.email}
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
            <Typography gutterBottom variant="body1" align="left">
							{userInfo.phone}
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
                <Chip variant="filled" label={userInfo.status}/>
              </Typography>
              
              </Grid>
            </Grid>
          </Box>
          </Box>
        {/* <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography variant="h5">Personal Information</Typography>
                </TableCell>
                <TableCell align="right">
                  <EditIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  Name
                </TableCell>
                <TableCell colSpan={2}>{userInfo.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Email
                </TableCell>
                <TableCell colSpan={2}>{userInfo.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Phone Number
                </TableCell>
                <TableCell>{userInfo.phone}</TableCell>
                <TableCell align="right">
                  <ContentCopyIcon />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Status
                </TableCell>
                <TableCell>
                  <Chip label="Active" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> */}
      </Paper>
    </div>
  );
}
