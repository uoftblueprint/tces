import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// MUI Components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from "@mui/material";

// Icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import JobTypeChipsComponent from "../../view-job-posts-component/job-type-chips-component";

function JobPostingsClientDashboardTableComponent({
  jobPostings,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalPages,
}) {
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Employer</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Job Type</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Close Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobPostings.length > 0 ? (
            jobPostings.map((jobPosting) => (
              <TableRow key={jobPosting.id}>
                <TableCell>
                  <span
                    onClick={() => navigate(`/job-postings/${jobPosting.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        navigate(`/job-postings/${jobPosting.id}`);
                    }}
                    role="button"
                    tabIndex={0}
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {jobPosting.title}
                  </span>
                </TableCell>
                <TableCell>{jobPosting.employer}</TableCell>
                <TableCell>
                  <LocationOnIcon
                    sx={{
                      color: "gray",
                      verticalAlign: "middle",
                      marginRight: 1,
                    }}
                  />
                  <span style={{ verticalAlign: "middle" }}>
                    {jobPosting.location}
                  </span>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "2px",
                      alignItems: "center",
                    }}
                  >
                    <JobTypeChipsComponent
                      jobTypes={
                        Array.isArray(jobPosting.job_type)
                          ? jobPosting.job_type
                          : [jobPosting.job_type]
                      }
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  {new Date(jobPosting.close_date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No job postings found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "16px",
          padding: "16px",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="body2">Rows per page</Typography>
        <Select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(e.target.value)}
          size="small"
        >
          {[10, 20, 30, 50].map((option) => (
            <MenuItem key={option} value={option}>
              {`${option}`}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body2">{`Page ${currentPage} of ${totalPages}`}</Typography>
        <IconButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </TableContainer>
  );
}

JobPostingsClientDashboardTableComponent.propTypes = {
  jobPostings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      employer: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      job_type: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]).isRequired,
      close_date: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default JobPostingsClientDashboardTableComponent;
