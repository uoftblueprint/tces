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

import PropTypes from "prop-types";
import * as React from "react";
import { STATUS_TYPES } from "../../../utils/contants";
import ClientType from "../../../prop-types/ClientType";
import { getOwnerIds } from "../../../utils/jobLeads";

function FilterCard({
  getUserById,
  managedClients,
  paginationModel,
  owners,
  handleApplyFilter,
  setParentFilterParams
}) {
  // setting and persisting initial state for option selection and slider range boundaries
  const [initialLoad, setInitialLoad] = React.useState(true);
  const [noFilterMode, setNoFilterMode] = React.useState(true);
  const [ignorePaginationChange, setIgnorePaginationChange] =
    React.useState(false);
  const [ownerOptions, setOwnerOptions] = React.useState([]);

  const [values, setValues] = useState({
    name: "",
    phoneNumber: "",
    dateUpdatedFrom: null,
    dateUpdatedUntil: null,
    dateRegisteredFrom: null,
    dateRegisteredUntil: null,
    owner: -1,
    actionStatus: "all",
  });

  const initialStatusSelect = STATUS_TYPES.reduce((acc, statusType) => {
    acc[statusType] = true;
    return acc;
  }, {});
  const [statusSelect, setStatusSelect] = React.useState(initialStatusSelect);

  const handleStatusFilterChange = (event) => {
    setStatusSelect({
      ...statusSelect,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handlePhoneNumberChange = (event) => {
    // Remove all non-numeric characters from the input
    setValues({
      ...values,
      phoneNumber: event.target.value.replace(/\D/g, ""),
    });
  };

  const handleDateChange = (prop) => (newValue) => {
    setValues({ ...values, [prop]: newValue });
  };

  const applyFilters = (isInvokedByPageChange = false) => {
    setIgnorePaginationChange(true);
    let customPageModel = null;
    if (!isInvokedByPageChange) {
      customPageModel = {
        pageSize: 10,
        page: 0,
      };
    }
    const filterParams = {
      ...values,
      status: {
        active: statusSelect.Active,
        rAndI: statusSelect["R&I"],
        closed: statusSelect.Closed,
      },
    }
    setParentFilterParams(filterParams);
    // we want to reset pagination model when we apply a filter
    handleApplyFilter(
      filterParams,
      customPageModel,
    );
  };

  const onFilterReset = () => {
    setValues({
      name: "",
      phoneNumber: "",
      dateUpdatedFrom: null,
      dateUpdatedUntil: null,
      dateRegisteredFrom: null,
      dateRegisteredUntil: null,
      owner: -1,
      actionStatus: "all",
    });
    setStatusSelect(initialStatusSelect);
    setIgnorePaginationChange(true);
    setParentFilterParams({
      name: "",
      phoneNumber: "",
      dateUpdatedFrom: null,
      dateUpdatedUntil: null,
      dateRegisteredFrom: null,
      dateRegisteredUntil: null,
      owner: -1,
      status: STATUS_TYPES.reduce((acc, statusType) => {
        acc[statusType] = true;
        return acc;
      }, {}),
      actionStatus: "all",
    });
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

  // triggers whenever the job leads list changes (e.g page change, filter change etc)
  React.useEffect(() => {
    if (initialLoad && managedClients?.length > 0) {
      setOwnerOptions(getOwnerIds(owners, getUserById));
      setInitialLoad(false);
    }
  }, [managedClients]);

  React.useEffect(() => {
    if (!initialLoad && !ignorePaginationChange) {
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
            <MenuItem value={-1}>Any</MenuItem>
            {ownerOptions.map((owner) => (
              <MenuItem key={owner.ownerID} value={owner.ownerID}>
                {owner.userName}
              </MenuItem>
            ))}
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
                      checked={statusSelect[statusType]}
                      onChange={handleStatusFilterChange}
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
        <Button
          onClick={onApplyFilterClick}
          variant="contained"
          sx={{ width: "100%" }}
        >
          APPLY FILTER
        </Button>
        <Button onClick={onFilterReset} sx={{ mt: 2, alignSelf: "flex-start" }}>
          RESET FILTERS
        </Button>
      </CardActions>
    </Card>
  );
}

FilterCard.propTypes = {
  getUserById: PropTypes.func.isRequired,
  managedClients: PropTypes.arrayOf(ClientType).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  paginationModel: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  owners: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleApplyFilter: PropTypes.func.isRequired,
  setParentFilterParams: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default FilterCard;
