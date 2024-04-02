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
import JobLeadType from "../../../prop-types/JobLeadType";
import { valuetext, getOwnerIds } from "../../../utils/jobLeads";

import { JOB_TYPES } from "../../../utils/contants";

function JobLeadDashboardFiltersComponent({
  managedJobLeads,
  getUserById,
  paginationModel,
  handleApplyFilter,
  jobLeadAggregates,
  owners,
  setParentFilterParams
}) {
  // setting and persisting initial state for option selection and slider range boundaries
  const [initialLoad, setInitialLoad] = React.useState(true);
  const [noFilterMode, setNoFilterMode] = React.useState(true);

  // explaination of this useState "ignorePaginationChange":
  // TLDR: this useState is used to avoid infinite loop when new filters are applied
  // Explaination: this use state is used to avoid infinite recursive call within the useEffect hook below that triggers on [paginationModel]
  // more specifically, whenever the user applies a new filter, we want to invoke a page change back to 0, but we also don't want to invoke
  // another apply filter from that specific useEffect that triggers on pagination model because it will cause an infinite loop.
  // Generally, we use this to let the hook know to know apply another filter as a toggle type mechanism
  const [ignorePaginationChange, setIgnorePaginationChange] =
    React.useState(false);
  const [ownerOptions, setOwnerOptions] = React.useState([]);

  // setting local state for filter config
  const [searchTitleQuery, setSearchTitleQuery] = React.useState("");
  const [startDateCreated, setStartDateCreated] = React.useState(null);
  const [endDateCreated, setEndDateCreated] = React.useState(null);
  const [startDateExpired, setStartDateExpired] = React.useState(null);
  const [endDateExpired, setEndDateExpired] = React.useState(null);
  const [compensationRange, setCompensationRange] = React.useState([
    null,
    null,
  ]);
  const [hoursPerWeekRange, setHoursPerWeekRange] = React.useState([
    null,
    null,
  ]);
  const [ownerId, setOwnerId] = React.useState(-1);
  const [searchNOCQuery, setSearchNOCQuery] = React.useState("");
  const initialJobTypeSelect = JOB_TYPES.reduce((acc, jobType) => {
    acc[jobType] = true;
    return acc;
  }, {});
  const [jobTypeSelect, setJobTypeSelect] =
    React.useState(initialJobTypeSelect);

  const { minCompensation, maxCompensation, maxHoursPerWeek, minHoursPerWeek } =
    jobLeadAggregates;
  const compensationSliderMarks = [
    {
      value: minCompensation,
      label: `$${minCompensation}`,
    },
    {
      value: maxCompensation,
      label: `$${maxCompensation}`,
    },
  ];

  const hourSliderMarks = [
    {
      value: minHoursPerWeek,
      label: `${minHoursPerWeek}`,
    },
    {
      value: maxHoursPerWeek,
      label: `${maxHoursPerWeek}`,
    },
  ];

  // min distance between thumbs of sliders
  const minDistance = 1;

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

  const applyFilters = (isInvokedByPageChange = false) => {
    const filterParams = {
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
    setSearchTitleQuery("");
    setStartDateCreated(null);
    setEndDateCreated(null);
    setStartDateExpired(null);
    setEndDateExpired(null);
    setOwnerId(-1);
    setSearchNOCQuery("");
    setJobTypeSelect(initialJobTypeSelect);
    setIgnorePaginationChange(true);
    // we want to reset pagination model when we apply a filter
    handleApplyFilter(null, {
      pageSize: 10,
      page: 0,
    });
    setParentFilterParams({
      searchTitleQuery: "",
        startDateCreated: null,
        endDateCreated: null,
        startDateExpired: null,
        endDateExpired: null,
        compensationRange: [null, null],
        hoursPerWeekRange: [null, null],
        ownerId: -1,
        searchNOCQuery: "",
        jobTypeSelect: JOB_TYPES.reduce((acc, jobType) => {
          acc[jobType] = true;
          return acc;
        }, {})
    });
  };

  const onApplyFilterClick = () => {
    setNoFilterMode(false);
    applyFilters();
  };

  // triggers whenever the job leads list changes (e.g page change, filter change etc)
  React.useEffect(() => {
    if (initialLoad && managedJobLeads?.length > 0) {
      setCompensationRange([minCompensation, maxCompensation]);
      setHoursPerWeekRange([minHoursPerWeek, maxHoursPerWeek]);
      setOwnerOptions(getOwnerIds(owners, getUserById));
      setInitialLoad(false);
    }
  }, [managedJobLeads]);

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card sx={{ width: 250, marginLeft: 4, marginBottom: 4 }}>
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
            {/* Date Expired Filter */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              Date Expired
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
            {/* Compensation Filter */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              Compensation
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={compensationRange}
                onChange={onCompensationRangeChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                step={1}
                min={minCompensation}
                max={maxCompensation}
                marks={compensationSliderMarks}
              />
            </Box>
            {/* Hours Per Week Filter */}
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              align="left"
              gutterBottom
            >
              Hours/week
            </Typography>
            <Box sx={{ px: 2 }}>
              <Slider
                value={hoursPerWeekRange}
                onChange={onHoursPerWeekRangeChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                step={1}
                min={minHoursPerWeek}
                max={maxHoursPerWeek}
                marks={hourSliderMarks}
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
            =
            <FormControl fullWidth>
              <Select
                labelId="owner-select-label"
                id="owner-select"
                value={ownerId}
                displayEmpty
                onChange={onOwnerIdChange}
              >
                <MenuItem value={-1}>Any</MenuItem>
                {ownerOptions.map((owner) => (
                  <MenuItem key={owner.ownerID} value={owner.ownerID}>
                    {owner.userName}
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
                {JOB_TYPES.map((jobType) => (
                  <FormControlLabel
                    key={jobType}
                    control={
                      <Checkbox
                        checked={jobTypeSelect[jobType]}
                        onChange={handleJobTypeFilterChange}
                        name={jobType}
                      />
                    }
                    label={jobType}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Stack>
        </CardContent>
        <CardActions sx={{ display: "flex", p: 2, flexDirection: "column" }}>
          <Button
            variant="contained"
            onClick={onApplyFilterClick}
            sx={{ width: "100%" }}
          >
            APPLY FLILTER
          </Button>
          <Button
            onClick={onFilterReset}
            sx={{ mt: 2, alignSelf: "flex-start" }}
          >
            RESET FILTERS
          </Button>
        </CardActions>
      </Card>
    </LocalizationProvider>
  );
}

JobLeadDashboardFiltersComponent.propTypes = {
  getUserById: PropTypes.func.isRequired,
  managedJobLeads: PropTypes.arrayOf(JobLeadType).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  paginationModel: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  jobLeadAggregates: PropTypes.object.isRequired,
  owners: PropTypes.arrayOf(PropTypes.number).isRequired,
  handleApplyFilter: PropTypes.func.isRequired,
  setParentFilterParams: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default JobLeadDashboardFiltersComponent;
