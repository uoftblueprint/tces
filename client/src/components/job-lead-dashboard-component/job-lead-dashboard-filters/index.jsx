// eslint-disable-next-line no-unused-vars
import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

function valuetext(value) {
  return `$${value}`;
}

function findCompensationRange(managedJobLeads) {
  let minCompensation = managedJobLeads[0]?.compensationMin ?? 0;
  let maxCompensation = managedJobLeads[0]?.compensationMax ?? 0;

  managedJobLeads.forEach((lead) => {
    if (lead.compensationMin < minCompensation)
      minCompensation = lead.compensationMin;
    if (lead.compensationMax > maxCompensation)
      maxCompensation = lead.compensationMax;
  });

  if (minCompensation === maxCompensation) {
    minCompensation = 0;
  }

  return [minCompensation, maxCompensation];
}

function findHoursPerWeekRange(managedJobLeads) {
  let minHours = managedJobLeads[0]?.hoursPerWeek ?? 0;
  let maxHours = managedJobLeads[0]?.hoursPerWeek ?? 0;

  managedJobLeads.forEach((lead) => {
    if (lead.hoursPerWeek < minHours) minHours = lead.hoursPerWeek;
    if (lead.hoursPerWeek > maxHours) maxHours = lead.hoursPerWeek;
  });

  if (minHours === maxHours) {
    minHours = 0;
  }

  return [minHours, maxHours];
}

function getOwnerIds(managedJobLeads) {
  const ownerIds = new Set(managedJobLeads.map((lead) => lead.creatorID));
  return Array.from(ownerIds);
}

function JobLeadDashboardFiltersComponent({ handleFilter, managedJobLeads }) {
  const minDistance = 1;
  const [minCompensation, maxCompensation] =
    findCompensationRange(managedJobLeads);

  const [minHours, maxHours] = findHoursPerWeekRange(managedJobLeads);

  const ownerIds = getOwnerIds(managedJobLeads);

  const [searchTitleQuery, setSearchTitleQuery] = React.useState("");
  const [startDateCreated, setStartDateCreated] = React.useState(null);
  const [endDateCreated, setEndDateCreated] = React.useState(null);
  const [startDateExpired, setStartDateExpired] = React.useState(null);
  const [endDateExpired, setEndDateExpired] = React.useState(null);
  const [compensationRange, setCompensationRange] = React.useState([
    minCompensation,
    maxCompensation,
  ]);
  const [hoursPerWeekRange, setHoursPerWeekRange] = React.useState([
    minHours,
    maxHours,
  ]);
  const [ownerId, setOwnerId] = React.useState(-1);
  const [searchNOCQuery, setSearchNOCQuery] = React.useState("");
  const [jobTypeSelect, setJobTypeSelect] = React.useState({
    "Full Time": true,
    "Part Time": true,
    Casual: true,
    "On Call": true,
  });

  React.useEffect(() => {
    const onFilterChange = () => {
      let filtered = managedJobLeads;

      if (searchTitleQuery) {
        filtered = filtered.filter((row) => {
          return row.jobTitle
            .toLowerCase()
            .includes(searchTitleQuery.toLowerCase());
        });
      }

      if (startDateCreated) {
        filtered = filtered.filter(
          (row) => new Date(row.creationDate) >= new Date(startDateCreated),
        );
      }

      if (endDateCreated) {
        filtered = filtered.filter(
          (row) => new Date(row.creationDate) <= new Date(endDateCreated),
        );
      }

      if (startDateExpired) {
        filtered = filtered.filter(
          (row) => new Date(row.expirationDate) >= new Date(startDateExpired),
        );
      }

      if (endDateExpired) {
        filtered = filtered.filter(
          (row) => new Date(row.expirationDate) <= new Date(endDateExpired),
        );
      }

      if (compensationRange) {
        filtered = filtered.filter(
          (row) =>
            row.compensationMin >= compensationRange[0] &&
            row.compensationMax <= compensationRange[1],
        );
      }

      if (hoursPerWeekRange) {
        filtered = filtered.filter(
          (row) =>
            row.hoursPerWeek >= hoursPerWeekRange[0] &&
            row.hoursPerWeek <= hoursPerWeekRange[1],
        );
      }

      if (ownerId !== -1) {
        filtered = filtered.filter((row) => row.creatorID === ownerId);
      }

      if (searchNOCQuery) {
        filtered = filtered.filter((row) =>
          String(row.noc).toLowerCase().includes(searchNOCQuery.toLowerCase()),
        );
      }

      if (jobTypeSelect) {
        filtered = filtered.filter((row) => jobTypeSelect[row.employmentType]);
      }

      handleFilter(filtered);
    };

    onFilterChange();
  }, [
    searchTitleQuery,
    startDateCreated,
    endDateCreated,
    startDateExpired,
    endDateExpired,
    compensationRange,
    hoursPerWeekRange,
    ownerId,
    searchNOCQuery,
    jobTypeSelect,
  ]);
  const onTitleSearch = (event) => {
    const query = event.target.value;
    setSearchTitleQuery(query);
  };

  const onNOCSearch = (event) => {
    const query = event.target.value;
    setSearchNOCQuery(query);
  };

  const onCompensationRangeChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setCompensationRange([
        Math.min(newValue[0], compensationRange[1] - minDistance),
        compensationRange[1],
      ]);
    } else {
      setCompensationRange([
        compensationRange[0],
        Math.max(newValue[1], compensationRange[0] + minDistance),
      ]);
    }
  };

  const onHoursPerWeekRangeChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setHoursPerWeekRange([
        Math.min(newValue[0], hoursPerWeekRange[1] - minDistance),
        hoursPerWeekRange[1],
      ]);
    } else {
      setHoursPerWeekRange([
        hoursPerWeekRange[0],
        Math.max(newValue[1], hoursPerWeekRange[0] + minDistance),
      ]);
    }
  };

  const onOwnerIdChange = (event) => {
    setOwnerId(event.target.value);
  };

  const handleJobTypeFilterChange = (event) => {
    setJobTypeSelect({
      ...jobTypeSelect,
      [event.target.name]: event.target.checked,
    });
  };
  const onFilterReset = () => {
    setSearchTitleQuery("");
    setStartDateCreated(null);
    setEndDateCreated(null);
    setStartDateExpired(null);
    setEndDateExpired(null);
    setCompensationRange([minCompensation, maxCompensation]);
    setHoursPerWeekRange([minHours, maxHours]);
    setOwnerId(-1);
    setSearchNOCQuery("");
    setJobTypeSelect({
      "Full Time": true,
      "Part Time": true,
      Casual: true,
      "On Call": true,
    });
  };

  React.useEffect(() => {
    onFilterReset();
  }, [managedJobLeads]);

  const compensationMarks = [
    {
      value: minCompensation,
      label: `$${minCompensation}`,
    },
    {
      value: maxCompensation,
      label: `$${maxCompensation}`,
    },
  ];

  const hoursPerWeekMarks = [
    {
      value: minHours,
      label: `${minHours}`,
    },
    {
      value: maxHours,
      label: `${minHours}`,
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card
        sx={{ width: 235, marginLeft: 2, maxHeight: "none", marginBottom: 2 }}
      >
        <CardContent>
          <Stack spacing={2}>
            {/* Title Filter */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              Title
            </Typography>
            <Typography sx={{ mb: 0.5 }} color="text.secondary">
              <TextField
                type="text"
                value={searchTitleQuery}
                onChange={onTitleSearch}
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
            {/* Date Created Filter */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              Date Created
            </Typography>
            <DatePicker
              label="From"
              value={startDateExpired}
              onChange={setStartDateExpired}
              renderInput={(params) => {
                // eslint-disable-next-line react/jsx-props-no-spreading
                return <TextField {...params} size="small" fullWidth />;
              }}
            />
            <DatePicker
              label="Until"
              value={endDateExpired}
              onChange={setEndDateExpired}
              renderInput={(params) => {
                // eslint-disable-next-line react/jsx-props-no-spreading
                return <TextField {...params} size="small" fullWidth />;
              }}
            />
            {/* Date Expired Filter */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              Expiry Date
            </Typography>
            <DatePicker
              label="From"
              value={startDateCreated}
              onChange={setStartDateCreated}
              renderInput={(params) => {
                // eslint-disable-next-line react/jsx-props-no-spreading
                return <TextField {...params} size="small" fullWidth />;
              }}
            />
            <DatePicker
              label="Until"
              value={endDateCreated}
              onChange={setEndDateCreated}
              renderInput={(params) => {
                // eslint-disable-next-line react/jsx-props-no-spreading
                return <TextField {...params} size="small" fullWidth />;
              }}
            />
            {/* Compensation Filter */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              Compensation
            </Typography>
            <Box marginBottom={2}>
              <Slider
                value={compensationRange}
                onChange={onCompensationRangeChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                step={1}
                min={minCompensation}
                max={maxCompensation}
                marks={compensationMarks}
              />
            </Box>

            {/* Compensation Filter */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              Hours/week
            </Typography>
            <Box marginBottom={2}>
              <Slider
                getAriaLabel={() => "Minimum distance"}
                value={hoursPerWeekRange}
                onChange={onHoursPerWeekRangeChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                step={1}
                min={minHours}
                max={maxHours}
                marks={hoursPerWeekMarks}
              />
            </Box>

            {/* Owner Filter */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              Owner
            </Typography>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={ownerId}
                displayEmpty
                onChange={onOwnerIdChange}
              >
                <MenuItem value={-1}>Any</MenuItem>
                {ownerIds.map((id) => (
                  <MenuItem key={id} value={id}>
                    {id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* NOC Filter */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              NOC
            </Typography>
            <Typography sx={{ mb: 0.5 }} color="text.secondary">
              <TextField
                type="text"
                value={searchNOCQuery}
                onChange={onNOCSearch}
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
            {/* Job Type Filter */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              Job Type
            </Typography>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jobTypeSelect["Full Time"]}
                      onChange={handleJobTypeFilterChange}
                      name="Full Time"
                    />
                  }
                  label="Full Time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jobTypeSelect["Part Time"]}
                      onChange={handleJobTypeFilterChange}
                      name="Part Time"
                    />
                  }
                  label="Part Time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jobTypeSelect.Casual}
                      onChange={handleJobTypeFilterChange}
                      name="Casual"
                    />
                  }
                  label="Casual"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={jobTypeSelect["On Call"]}
                      onChange={handleJobTypeFilterChange}
                      name="On Call"
                    />
                  }
                  label="On Call"
                />
              </FormGroup>
            </FormControl>
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onFilterReset}>
            Reset Filters
          </Button>
        </CardActions>
      </Card>
    </LocalizationProvider>
  );
}

JobLeadDashboardFiltersComponent.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  managedJobLeads: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default JobLeadDashboardFiltersComponent;
