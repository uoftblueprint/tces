import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

function EmployerDashboardFilter() {
  return (
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
  );
}

export default EmployerDashboardFilter;
