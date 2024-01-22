import { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

function EmployerDashboardFilter() {
  const [employerName, setEmployerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [postalCode, setPostalCode] = useState('');

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleDateChange = (setter) => (newValue) => {
    setter(newValue);
  };

  return (
    <Card sx={{ width: 240, height: 'fit-content', marginLeft: 2 }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, mb: 2 }}
          color="text.secondary"
          align="left"
          gutterBottom
        >
          Employer Name
        </Typography>
        <TextField
          type="text"
          size="small"
          value={employerName}
          onChange={handleInputChange(setEmployerName)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        <Typography
          sx={{ fontSize: 14, mb: 2 }}
          color="text.secondary"
          align="left"
          gutterBottom
        >
          Phone Number
        </Typography>
        <TextField
          type="text"
          size="small"
          value={phoneNumber}
          onChange={handleInputChange(setPhoneNumber)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

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
            value={dateFrom}
            onChange={handleDateChange(setDateFrom)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
            sx={{ mb: 2 }}
          />
          <DatePicker
            label="To"
            value={dateTo}
            onChange={handleDateChange(setDateTo)}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
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
        <TextField
          type="text"
          size="small"
          value={postalCode}
          onChange={handleInputChange(setPostalCode)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </CardContent>
    </Card>
  );
}

export default EmployerDashboardFilter;
