import { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  Select,
  Card,
  CardContent,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

function FilterCard() {

  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    dateUpdatedFrom: null,
    dateUpdatedUntil: null,
    dateRegisteredFrom: null,
    dateRegisteredUntil: null,
    owner: "All",
    status: {
      active: false,
      rAndI: false,
      closed: false,
    },
    actionStatus: "all",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleDateChange = (prop) => (newValue) => {
    setValues({ ...values, [prop]: newValue });
  };

  const handleStatusChange = (prop) => (event) => {
    setValues({
      ...values,
      status: { ...values.status, [prop]: event.target.checked },
    });
  };

  const handleReset = () => {
    setValues({
      name: "",
      phoneNumber: "",
      dateUpdatedFrom: null,
      dateUpdatedUntil: null,
      dateRegisteredFrom: null,
      dateRegisteredUntil: null,
      owner: "All",
      status: {
        active: false,
        rAndI: false,
        closed: false,
      },
      actionStatus: "all",
    });
  };

  return (
    <Card sx={{ width: 256, color: "rgba(0, 0, 0, 0.6)" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="body1" sx={{ textAlign: "left" }}>
          Name
        </Typography>
        <TextField
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="body1" sx={{ textAlign: "left" }}>
          Phone Number
        </Typography>
        <TextField
          value={values.phoneNumber}
          onChange={handleChange("phoneNumber")}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="body1" sx={{ textAlign: "left", mb: 2 }}>
          Date Updated
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            value={values.dateUpdatedFrom}
            onChange={handleDateChange("dateUpdatedFrom")}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
            sx={{ mb: 2 }}
          />
          <DatePicker
            label="To"
            value={values.dateUpdatedUntil}
            onChange={handleDateChange("dateUpdatedUntil")}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
            sx={{ mb: 2 }}
          />
        
          <Typography variant="body1" sx={{ textAlign: "left", mb: 2 }}>
            Date Registered
          </Typography>
          <DatePicker
            label="From"
            value={values.dateRegisteredFrom}
            onChange={handleDateChange("dateRegisteredFrom")}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
            sx={{ mb: 2 }}
          />
          <DatePicker
            label="To"
            value={values.dateRegisteredUntil}
            onChange={handleDateChange("dateRegisteredUntil")}
            // eslint-disable-next-line react/jsx-props-no-spreading
            renderInput={(params) => <TextField {...params} />}
            sx={{ mb: 2 }}
          />
        </LocalizationProvider>
        <Typography variant="body1" sx={{ textAlign: "left", mb: 2 }}>
          Owner
        </Typography>
        <Select
          labelId="owner-label"
          id="owner-select"
          value={values.owner}
          onChange={handleChange("owner")}
          fullWidth
        >
          <MenuItem value="All">All</MenuItem>
        </Select>
        <Typography variant="body1" sx={{ textAlign: "left", mt: 2 }}>
          Status
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.status.active}
              onChange={handleStatusChange("active")}
            />
          }
          label="Active"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.status.rAndI}
              onChange={handleStatusChange("rAndI")}
            />
          }
          label="R&I"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={values.status.closed}
              onChange={handleStatusChange("closed")}
            />
          }
          label="Closed"
        />
        <Button variant="contained" sx={{ mt: 2 }}>APPLY FLILTER</Button>
        <Button onClick={handleReset} sx={{ mt: 2, alignSelf: "flex-start" }}>
          RESET FILTERS
        </Button>
      </CardContent>
    </Card>
  );
}

export default FilterCard;
