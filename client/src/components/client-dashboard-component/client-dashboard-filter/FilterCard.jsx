import { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControl,
  FormGroup,
  FormControlLabel,
  Button,
  MenuItem,
  Select,
  Card,
  CardContent,
  CardActions,
  Typography,
  InputAdornment,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

import { STATUS_TYPES } from "../../../utils/contants";

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

  const handlePhoneNumberChange = (event) => {
    // Remove all non-numeric characters from the input
    setValues({ ...values, phoneNumber: event.target.value.replace(/\D/g, "") });
  };

  const handleDateChange = (prop) => (newValue) => {
    setValues({ ...values, [prop]: newValue });
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
    <Card sx={{ width: 250, marginLeft: 4, marginBottom: 4 }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            align="left"
            gutterBottom
          >
            Name
          </Typography>
          <Typography sx={{ mb: 0.5 }} color="text.secondary">
            <TextField
              type="text"
              value={values.name}
              onChange={handleChange("name")}
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
            sx={{ fontSize: 14 }}
            color="text.secondary"
            align="left"
            gutterBottom
          >
            Phone Number
          </Typography>
          <TextField
            type="text"
            value={values.phoneNumber}
            onChange={handlePhoneNumberChange}
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
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            align="left"
            gutterBottom
          >
            Date Updated
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From"
              value={values.dateUpdatedFrom}
              onChange={handleDateChange("dateUpdatedFrom")}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="Until"
              value={values.dateUpdatedUntil}
              onChange={handleDateChange("dateUpdatedUntil")}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => <TextField {...params} />}
            />

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              Date Registered
            </Typography>
            <DatePicker
              label="From"
              value={values.dateRegisteredFrom}
              onChange={handleDateChange("dateRegisteredFrom")}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="Until"
              value={values.dateRegisteredUntil}
              onChange={handleDateChange("dateRegisteredUntil")}
              // eslint-disable-next-line react/jsx-props-no-spreading
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            align="left"
            gutterBottom
          >
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
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            align="left"
            gutterBottom
          >
            Status
          </Typography>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormGroup>
              {STATUS_TYPES.map((statusType) => (
                <FormControlLabel
                  key={statusType}
                  control={
                    <Checkbox
                      checked={() => {}}
                      onChange={() => {}}
                      name={statusType}
                    />
                  }
                  label={statusType}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Stack>
      </CardContent>
      <CardActions sx={{ display: "flex", p: 2, flexDirection: "column" }}>
        <Button variant="contained" sx={{ width: "100%" }}>
          APPLY FLILTER
        </Button>
        <Button onClick={handleReset} sx={{ mt: 2, alignSelf: "flex-start" }}>
          RESET FILTERS
        </Button>
      </CardActions>
    </Card>
  );
}

export default FilterCard;
