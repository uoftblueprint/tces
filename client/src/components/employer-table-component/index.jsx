import Box from "@mui/material/Box";
// import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { DashboardContainer, HeaderContainer } from "./index.styles";

function EmployerTable() {
  return (
    <div>
      <DashboardContainer>
        <HeaderContainer>
          <ArrowBackIcon
            sx={{
              color: "gray",
              marginRight: 2,
              marginLeft: 2,
              cursor: "pointer",
            }}
          />
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
            All Employers
          </Typography>
          <Button
            sx={{
              marginLeft: "auto",
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
            height: 400,
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
        </Box>
      </DashboardContainer>
    </div>
  );
}

export default EmployerTable;
