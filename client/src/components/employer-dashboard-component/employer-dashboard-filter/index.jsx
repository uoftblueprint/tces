import { useState } from "react";
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
import PropTypes from "prop-types";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { getOwnerIds } from "../../../utils/jobLeads";
import JobLeadType from "../../../prop-types/JobLeadType";

function EmployerDashboardFilter({
  paginationModel,
  handleApplyFilter,
  owners,
  getUserById,
  setParentFilterParams,
}) {
  // setting and persisting initial state
  const [noFilterMode, setNoFilterMode] = React.useState(true);
  const [ignorePaginationChange, setIgnorePaginationChange] =
    React.useState(false);

  // local filter states
  const ownerOptions = getOwnerIds(owners, getUserById);
  const [employerName, setEmployerName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [postalCode, setPostalCode] = useState("");
  const [ownerId, setOwnerId] = React.useState(-1);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleDateChange = (setter) => (newValue) => {
    setter(newValue);
  };

  const onOwnerIdChange = (event) => {
    setOwnerId(event.target.value);
  };

  const applyFilters = (isInvokedByPageChange = false) => {
    const filterParams = {
      employerName,
      contactName,
      phoneNumber,
      dateFrom,
      dateTo,
      ownerId,
      postalCode,
    };
    setIgnorePaginationChange(true);
    let customPageModel = null;
    if (!isInvokedByPageChange) {
      customPageModel = {
        pageSize: 10,
        page: 0,
      };
    }
    setParentFilterParams(filterParams);
    // we want to reset pagination model when we apply a filter
    handleApplyFilter(filterParams, customPageModel);
  };

  const onFilterReset = () => {
    setNoFilterMode(true);
    setEmployerName("");
    setContactName("");
    setPhoneNumber("");
    setDateFrom(null);
    setDateTo(null);
    setPostalCode("");
    setParentFilterParams({
      employerName: "",
      contactName: "",
      phoneNumber: "",
      dateFrom: null,
      dateTo: null,
      ownerId: -1,
      postalCode: "",
    });
    setIgnorePaginationChange(true);
    // we want to reset pagination model when we apply a filter
    handleApplyFilter(null, {
      pageSize: 10,
      page: 0,
    });
  };

  const onApplyFilterClick = () => {
    setNoFilterMode(false);
    applyFilters();
  };

  React.useEffect(() => {
    if (!ignorePaginationChange) {
      if (noFilterMode) {
        handleApplyFilter(null);
      } else {
        applyFilters(true);
      }
    } else {
      setIgnorePaginationChange(false);
    }
  }, [paginationModel]);

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
          Contact Name
        </Typography>
        <TextField
          type="text"
          size="small"
          value={contactName}
          onChange={handleInputChange(setContactName)}
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
          Owner
        </Typography>
        <FormControl fullWidth>
          <Select
            labelId="owner-select-label"
            id="owner-select"
            value={ownerId}
            displayEmpty
            onChange={onOwnerIdChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value={-1}>Any</MenuItem>
            {ownerOptions.map((owner) => (
              <MenuItem key={owner.ownerID} value={owner.ownerID}>
                {owner.userName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
      <CardActions sx={{ display: "flex", p: 2, flexDirection: "column" }}>
        <Button
          variant="contained"
          onClick={onApplyFilterClick}
          sx={{ width: "100%" }}
        >
          APPLY FLILTER
        </Button>
        <Button onClick={onFilterReset} sx={{ mt: 2, alignSelf: "flex-start" }}>
          RESET FILTERS
        </Button>
      </CardActions>
    </Card>
  );
}

EmployerDashboardFilter.propTypes = {
  managedEmployers: PropTypes.arrayOf(JobLeadType).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  paginationModel: PropTypes.object.isRequired,
  handleApplyFilter: PropTypes.func.isRequired,
  owners: PropTypes.arrayOf(PropTypes.number).isRequired,
  getUserById: PropTypes.func.isRequired,
  setParentFilterParams: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default EmployerDashboardFilter;
