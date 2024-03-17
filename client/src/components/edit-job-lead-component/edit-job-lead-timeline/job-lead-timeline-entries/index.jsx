import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import JobLeadType from "../../../../prop-types/JobLeadType";
import { getFilteredJobLeadsTimelineEntries } from "../../../../utils/api";
import JobLeadEntryComponent from "../../../timeline-entry-components/job-lead-entry-component";

function JobLeadTimelineEntriesComponent({ jobLead, type, externalError, globalSearchQuery }) {
  const [timelineEntries, setTimelineEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorOb, setError] = useState(null);
  const [totalEntriesCount, setTotalEntriesCount] = useState(0);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const fetchJobLeadsTimelineEntries = async (searchQuery = null) => {
    setLoading(true);
    setError(null);

    const { pageSize, page } = paginationModel;

    const queryParams = new URLSearchParams({
      pageSize,
      page,
    });

    queryParams.append("job_lead", jobLead.id);

    if (type !== "all") {
      queryParams.append("type", type);
    }

    if (searchQuery) {
      queryParams.append("search_query", globalSearchQuery);
    }

    try {
      setLoading(true);
      const response = await getFilteredJobLeadsTimelineEntries(
        queryParams.toString(),
      );
      if (response.ok) {
        const jobLeadTimelineEntries = await response.json();
        const formattedEntries = jobLeadTimelineEntries.data.map((entry) => ({
          id: entry.id,
          dateAdded: entry.date_added,
          type: entry.type,
          title: entry.title,
          body: entry.body,
          client: entry.client_details,
          jobLead: entry.job_lead_details,
        }));
        setTimelineEntries(formattedEntries);
        setTotalEntriesCount(jobLeadTimelineEntries.totalCount);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Fetch failed.");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreEntries = () => {
    setPaginationModel((prevModel) => ({
      ...prevModel,
      pageSize: prevModel.pageSize + 10,
    }));
  };

  useEffect(() => {
    fetchJobLeadsTimelineEntries();
  }, [paginationModel]);

  useEffect(() => {
    if (externalError) {
      setError(externalError);
    }

  }, [externalError]);

  useEffect(() => {
    fetchJobLeadsTimelineEntries(globalSearchQuery);
  }, [globalSearchQuery])

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "65vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (errorOb) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "65vh",
          flexDirection: "column",
        }}
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          Error loading timeline entries
        </Typography>
        <Button
          onClick={fetchJobLeadsTimelineEntries}
          variant="contained"
          color="primary"
        >
          Reload
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxHeight: "61vh", overflowY: "auto" }}>
      {timelineEntries.length > 0 ? (
        timelineEntries.map((entry) => <JobLeadEntryComponent entry={entry} />)
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "65vh",
          }}
        >
          <Typography variant="body1">No timeline entries found.</Typography>
        </Box>
      )}
      {totalEntriesCount > timelineEntries.length && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
          <Button onClick={loadMoreEntries} variant="contained" color="primary">
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}

JobLeadTimelineEntriesComponent.propTypes = {
  jobLead: JobLeadType.isRequired,
  type: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  globalSearchQuery: PropTypes.string.isRequired,
  externalError: PropTypes.string.isRequired,
};

export default JobLeadTimelineEntriesComponent;
