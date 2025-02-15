import { useState, useEffect } from "react";

// MUI
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

// Imported Components
import JobTypeChipsComponent from "../../view-job-posts-component/job-type-chips-component";

function JobPostingsClientDashboardTableComponent() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobPostings, setJobPostings] = useState([]);

  const totalRows = jobPostings.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, totalRows);

  useEffect(() => {
    const fetchActiveJobPostings = async () => {
      try {
        const response = await getAllActiveJobPosts();
        const activeJobPostings = await response.json(); // Parse JSON here
        setJobPostings(activeJobPostings.publicJobPosts.data);
      } catch (error) {
        console.error("Error fetching active job postings:", error);
      }
    };

    fetchActiveJobPostings();
  }, []);

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
          {jobPostings.slice(startRow - 1, endRow).map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <a
                  href={row.url || "#"} // Handle missing URLs
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    fontWeight: "bold",
                  }}
                >
                  {row.title}
                </a>
              </TableCell>
              <TableCell>{row.employer}</TableCell>
              <TableCell>
                <LocationOnIcon
                  sx={{
                    color: "gray",
                    verticalAlign: "middle",
                    marginRight: 1,
                  }}
                />
                <span style={{ verticalAlign: "middle" }}>{row.location}</span>
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
                  <JobTypeChipsComponent jobTypes={row.job_type} />{" "}
                  {/* Updated for correct field */}
                </Box>
              </TableCell>
              <TableCell>
                {new Date(row.close_date).toLocaleDateString()}
              </TableCell>{" "}
              {/* Convert ISO date */}
            </TableRow>
          ))}
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
        <Typography variant="body2">{`${startRow} - ${endRow} of ${totalRows}`}</Typography>
        <IconButton onClick={handlePrevPage} disabled={currentPage === 1}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    </TableContainer>
  );
}

export default JobPostingsClientDashboardTableComponent;
