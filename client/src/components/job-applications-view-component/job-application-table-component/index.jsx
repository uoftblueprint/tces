import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";
// import { fetchAllJobApplications } from "../../utils/job_applications_api";
// import { getAllJobPosts } from "../../utils/job_posts_api";
import ApplicationStatusChipComponent from "../application-status-chips";

// TODO: When resume download is implemented, add feature to the resume download button in table

const tableHeaders = [
  "Job ID #",
  "Title",
  "Applicant Name",
  "Email",
  "Phone",
  "Postal Code",
  "Date Applied",
  "Status",
  "Resume",
];

function DataTable({ jobApplications }) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const formatPhoneNumber = (phoneNumber) =>
    phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

  const formatPostalCode = (postalCode) =>
    postalCode
      .toUpperCase()
      .replace(/^([A-Za-z]\d[A-Za-z])(\d[A-Za-z]\d)$/, "$1 $2");

  const paginatedData = jobApplications.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Paper sx={{ width: "100%", marginTop: "35px" }}>
      <TableContainer sx={{ width: "100%" }} component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {tableHeaders.map((title) => (
                <TableCell sx={{ fontWeight: 700 }} align="left">
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">
                  {formatPhoneNumber(row.phone)}
                </TableCell>
                <TableCell align="left">
                  {formatPostalCode(row.postal_code)}
                </TableCell>
                <TableCell align="left">
                  {/* Expect createdAt to be formated as date for ease of use here and sorting */}
                  {row.createdAt.toLocaleDateString("en-CA")}
                </TableCell>
                <TableCell align="left">
                  <ApplicationStatusChipComponent
                    status={[row.application_status]}
                  />
                </TableCell>
                <TableCell align="left">
                  <DownloadIcon color="primary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={jobApplications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DataTable;
