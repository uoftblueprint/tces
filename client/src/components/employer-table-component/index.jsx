import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import {
  TablePagination,
  Box,
  Button,
  IconButton,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Container, DashboardContainer, HeaderContainer } from "./index.styles";

function EmployerTableComponent({ employerData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedData = employerData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Container>
      <DashboardContainer>
        <HeaderContainer>
          <IconButton
            sx={{
              marginRight: 2,
              marginLeft: 2,
            }}
            // onClick={}
            size="small"
          >
            <ArrowBackIcon
              sx={{
                color: "gray",
                cursor: "pointer",
              }}
            />
          </IconButton>
          <div style={{ flexGrow: 1 }}>
            <Typography
              style={{
                fontFamily: "Arial",
                fontSize: "34px",
                fontWeight: 500,
                lineHeight: "60px",
                letterSpacing: "0.25px",
                textAlign: "left",
              }}
            >
              All Employers
            </Typography>
            <Typography
              style={{
                fontFamily: "Arial",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "0px",
                letterSpacing: "0.1px",
                textAlign: "left",
                color: "#00000099",
              }}
            >
              {employerData.length} Employers
            </Typography>
          </div>
          <Button
            sx={{
              marginLeft: "auto",
              marginBottom: "30px",
              marginTop: "30px",
              backgroundColor: "#ffffff0",
              color: "#3568E5",
              border: 1,
              "&:hover": {
                backgroundColor: "#ffffff0",
                color: "#3568E5",
              },
            }}
            startIcon={<AddIcon />}
          >
            EXPORT CURRENT FILTER VIEW ({employerData.length} EMPLOYERS)
          </Button>
          <Button
            sx={{
              marginLeft: "16px",
              marginBottom: "30px",
              marginTop: "30px",
              backgroundColor: "#3568E5",
              color: "white",
              "&:hover": {
                backgroundColor: "#3568E5",
                color: "white",
              },
            }}
            startIcon={<AddIcon />}
          >
            ADD NEW EMPLOYER
          </Button>
        </HeaderContainer>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gridColumnGap: "30px",
            height: "fit-content",
            paddingBottom: "16px",
            width: "100%",
          }}
        >
          <Card sx={{ width: 240, height: "fit-content", marginLeft: 2 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14, mb: 2 }}
                color="text.secondary"
                align="left"
                gutterBottom
              >
                Employer Name
              </Typography>
              <Typography sx={{ mb: 2 }} color="text.secondary">
                <TextField
                  type="text"
                  size="small"
                  style={{
                    borderWidth: "10px",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Typography>
              <Typography
                sx={{ fontSize: 14, mb: 2 }}
                color="text.secondary"
                align="left"
                gutterBottom
              >
                Phone Number
              </Typography>
              <Typography sx={{ mb: 2 }} color="text.secondary">
                <TextField
                  type="text"
                  size="small"
                  style={{
                    borderWidth: "10px",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Typography>
              <Typography
                sx={{ fontSize: 14, mb: 2 }}
                color="text.secondary"
                align="left"
                gutterBottom
              >
                Date Added
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="From"
                  renderInput={(params) => (
                    // eslint-disable-next-line
                    <TextField {...params} error={false} helperText="" />
                  )}
                  sx={{ mb: 2 }}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="To"
                  renderInput={(params) => (
                    // eslint-disable-next-line
                    <TextField {...params} error={false} helperText="" />
                  )}
                  sx={{ mb: 2 }}
                />
              </LocalizationProvider>
              <Typography
                sx={{ fontSize: 14, mb: 2 }}
                color="text.secondary"
                align="left"
                gutterBottom
              >
                Postal Code
              </Typography>
              <Typography color="text.secondary">
                <TextField
                  type="text"
                  size="small"
                  style={{
                    borderWidth: "10px",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Typography>
            </CardContent>
          </Card>
          <TableContainer
            component={Paper}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "fit-content",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Employer Name</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Phone Number</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Primary Contact</TableCell>
                  <TableCell align="left">Owner</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ overflowY: "auto" }}>
                {slicedData.map(
                  (
                    {
                      employerName,
                      date,
                      phoneNumber,
                      email,
                      primaryContact,
                      owner,
                    },
                    index,
                  ) => (
                    <TableRow
                      // eslint-disable-next-line react/no-array-index-key
                      key={`${employerName}-${index}`}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">{employerName}</TableCell>
                      <TableCell align="left">{formatDate(date)}</TableCell>
                      <TableCell align="left">{phoneNumber}</TableCell>
                      <TableCell align="left">{email}</TableCell>
                      <TableCell align="left">{primaryContact}</TableCell>
                      <TableCell align="left">
                        <Chip
                          avatar={<Avatar>{/* photo */}</Avatar>}
                          label={owner}
                        />
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={employerData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      </DashboardContainer>
    </Container>
  );
}

EmployerTableComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  employerData: PropTypes.array.isRequired,
};

export default EmployerTableComponent;
