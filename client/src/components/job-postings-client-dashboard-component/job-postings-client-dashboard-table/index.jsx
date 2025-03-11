import { useState, useEffect } from "react";
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

import { getAllActiveJobPosts } from "../../../utils/job_posts_api";
import JobTypeChipsComponent from "../../view-job-posts-component/job-type-chips-component";

function JobPostingsClientDashboardTableComponent({ 
  sortConfig, 
  selectedJobType, 
  selectedLocation 
}) {
  const [jobPostings, setJobPostings] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Fetch job postings when the component mounts
  useEffect(() => {
    const fetchActiveJobPostings = async () => {
      try {
        const response = await getAllActiveJobPosts();
        const activeJobPostings = await response.json();
        setJobPostings(activeJobPostings.publicJobPosts.data);
      } catch (error) {
        console.error("Error fetching active job postings:", error);
      }
    };

    fetchActiveJobPostings();
  }, []);

  console.log("SortConfig:", sortConfig);
  console.log("Selected Job Type:", selectedJobType);
  console.log("Selected Location:", selectedLocation);

  // Apply filters first
  const filteredJobPostings = jobPostings.filter((job) => {
    const matchesJobType = selectedJobType
      ? job.job_type.includes(selectedJobType) // ✅ Checks if selected job type exists in array
      : true;
    const matchesLocation = selectedLocation ? job.location === selectedLocation : true;
    
    return matchesJobType && matchesLocation;
  });
  

  // Apply sorting after filtering
  const sortedJobPostings = [...filteredJobPostings].sort((a, b) => {
    if (!sortConfig || !a[sortConfig.key] || !b[sortConfig.key]) return 0;

    const { key, direction } = sortConfig;
    let valA = a[key];
    let valB = b[key];

    // Convert to Date object for proper sorting by date
    if (key === "close_date") {
      valA = new Date(a[key]);
      valB = new Date(b[key]);
    }

    // Ensure case-insensitive sorting for job type and location
    if (key === "job_type" || key === "location") {
      valA = valA.toString().toLowerCase();
      valB = valB.toString().toLowerCase();
    }

    if (valA < valB) return direction === "asc" ? -1 : 1;
    if (valA > valB) return direction === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination calculations (applied after filtering & sorting)
  const totalRows = sortedJobPostings.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          {sortedJobPostings.length > 0 ? (
            sortedJobPostings.slice(startRow, endRow).map((jobPosting) => (
              <TableRow key={jobPosting.id}>
                <TableCell>
                  <span
                    onClick={() => navigate(`/job-postings/${jobPosting.id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") navigate(`/job-postings/${jobPosting.id}`);
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
                  <LocationOnIcon sx={{ color: "gray", verticalAlign: "middle", marginRight: 1 }} />
                  <span style={{ verticalAlign: "middle" }}>{jobPosting.location}</span>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2px", alignItems: "center" }}>
                    <JobTypeChipsComponent jobTypes={jobPosting.job_type} />
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
          onChange={handleRowsPerPageChange}
          size="small"
          sx={{ minWidth: "120px" }}
        >
          {[10, 20, 30, 50].map((option) => (
            <MenuItem key={option} value={option}>
              {`${option}`}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body2">{`${startRow + 1} - ${endRow} of ${totalRows}`}</Typography>
        <IconButton onClick={handlePrevPage} disabled={currentPage === 1}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </TableContainer>
  );
}

export default JobPostingsClientDashboardTableComponent;
