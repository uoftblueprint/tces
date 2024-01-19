import { useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  MenuItem,
  Select,
  Card,
  CardContent,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
        <Typography variant="body1" sx={{ textAlign: "left" }}>
          Date Updated
        </Typography>
        <TextField
          label="From"
          type="date"
          value={values.dateUpdatedFrom || ""}
          onChange={handleChange("dateUpdatedFrom")}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Until"
          type="date"
          value={values.dateUpdatedUntil || ""}
          onChange={handleChange("dateUpdatedUntil")}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography variant="body1" sx={{ textAlign: "left" }}>
          Date Registered
        </Typography>
        <TextField
          label="From"
          type="date"
          value={values.dateRegisteredFrom || ""}
          onChange={handleChange("dateRegisteredFrom")}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Until"
          type="date"
          value={values.dateRegisteredUntil || ""}
          onChange={handleChange("dateRegisteredUntil")}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography variant="body1" sx={{ textAlign: "left" }}>
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
        <Typography variant="body1" sx={{ textAlign: "left" }}>
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
        {values.status.closed && (
          <Box sx={{ pl: 3 }}>
            <RadioGroup
              aria-label="action-status"
              name="actionStatus"
              value={values.actionStatus}
              onChange={handleChange("actionStatus")}
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel
                value="actionNeeded"
                control={<Radio />}
                label="Action Needed"
              />
            </RadioGroup>
          </Box>
        )}
        <Button onClick={handleReset} sx={{ mt: 2, alignSelf: "flex-start" }}>
          RESET FILTERS
        </Button>
      </CardContent>
    </Card>
  );
}

export default FilterCard;
