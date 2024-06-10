import { Typography, Container } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import DashboardHeaderComponent from "./header-dashboard-component";
import {
  MainContainer,
  SearchFieldContainer,
  SearchField,
  Divider,
} from "./index.styles";
import DashboardNavigationComponent from "./nav-dashboard-component";
import UpdatesCollection from "./update-collection-component";
import UserType from "../../prop-types/UserType";
import { getFilteredEmployerTimelineEntries } from "../../utils/api";
import ErrorScreenComponent from "../shared/error-screen-component";

function DashboardComponent({ currUser }) {
  const [timelineEntries, setTimelineEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorOb, setError] = useState(null);
  const [totalEntriesCount, setTotalEntriesCount] = useState(0);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
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

    queryParams.append("type", "job");

    if (searchQuery) {
      queryParams.append("search_query", globalSearchQuery);
    }

    try {
      setLoading(true);
      const response = await getFilteredEmployerTimelineEntries(
        queryParams.toString(),
      );
      if (response.ok) {
        const employerTimelineEntries = await response.json();
        const formattedEntries = employerTimelineEntries.data.map((entry) => ({
          id: entry.id,
          dateAdded: entry.date_added,
          type: entry.type,
          title: entry.title,
          body: entry.body,
          client: entry.client_details,
          jobLead: entry.job_lead_details,
          employer: entry.employer_details,
        }));
        setTimelineEntries(formattedEntries);
        setTotalEntriesCount(employerTimelineEntries.totalCount);
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

  const invokeSearch = () => {
    setGlobalSearchQuery(localSearchQuery);
  };

  useEffect(() => {
    fetchJobLeadsTimelineEntries(globalSearchQuery);
  }, [paginationModel]);

  useEffect(() => {
    fetchJobLeadsTimelineEntries(globalSearchQuery);
  }, [globalSearchQuery]);
  if (errorOb) return <ErrorScreenComponent message={errorOb} />;

  return (
    <div>
      <Container>
        <DashboardHeaderComponent currUser={currUser} />
        <DashboardNavigationComponent />
        <MainContainer>
          <Typography
            variant="h5"
            gutterBottom
            align="left"
            sx={{
              paddingLeft: "20px",
            }}
          >
            Job Lead Updates
          </Typography>
          <Divider />
          <UpdatesCollection
            loading={loading}
            jobUpdates={timelineEntries}
            totalEntriesCount={totalEntriesCount}
            loadMoreEntries={loadMoreEntries}
          />
        </MainContainer>
        <SearchFieldContainer>
          <SearchField
            fullWidth
            placeholder="Search..."
            variant="outlined"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            sx={{
              mt: 0,
              mb: 2,
              borderRadius: 0,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={invokeSearch}
                    aria-label="search"
                    edge="start"
                    sx={{
                      m: 0,
                      p: 0,
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setLocalSearchQuery("");
                      setGlobalSearchQuery("");
                    }}
                    aria-label="reset search"
                    edge="end"
                    sx={{
                      m: 0,
                      p: 0,
                      visibility: localSearchQuery ? "visible" : "hidden",
                      "&:hover": {
                        cursor: "pointer",
                      },
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </SearchFieldContainer>
      </Container>
    </div>
  );
}

DashboardComponent.propTypes = {
  currUser: UserType.isRequired,
};

export default DashboardComponent;
