// import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

export default function ClientPage() {
  const userInfo = {
    firstName: "First Last",
    email: "emailemail.com",
    phone: "+1 111 111 1111",
  };

  return (
    <div style={{ marginLeft: "40px", marginRight: "40px" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <ArrowBackIcon sx={{ color: "gray", marginRight: 2, marginLeft: 2 }} />
        <Typography
          style={{
            fontFamily: "Arial",
            fontSize: "34px",
            fontWeight: 500,
            lineHeight: "42px",
            letterSpacing: "0.25px",
            textAlign: "left",
          }}
        >
          John Smith
        </Typography>
        <Card id="people-card" sx={{ marginLeft: "auto" }}>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell id="people-card-cell">Owner</TableCell>
                  <TableCell id="people-card-cell">Creator</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell id="people-card-cell">
                    <Chip
                      variant="outlined"
                      avatar={
                        <Avatar
                          sx={{
                            background: "#E53568",
                            color: "#FFFFFF",
                          }}
                        >
                          OP
                        </Avatar>
                      }
                      label="Owen Perth"
                      deleteIcon={<EditIcon />}
                    />
                  </TableCell>
                  <TableCell id="people-card-cell">
                    <Chip
                      variant="outlined"
                      avatar={
                        <Avatar sx={{ background: "blue", color: "white" }}>
                          EG
                        </Avatar>
                      }
                      label="Emily Gale"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Paper>
        <TableContainer>
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
                <TableCell>{userInfo.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  Email
                </TableCell>
                <TableCell>{userInfo.email}</TableCell>
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
        </TableContainer>
      </Paper>
    </div>
  );
}
