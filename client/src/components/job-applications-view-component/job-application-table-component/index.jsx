import {
  TablePagination,
  TableFooter,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PropTypes from "prop-types";
import ApplicationStatusChipComponent from "../application-status-chips";

// Future TODOs ------
// 1. When single job specific pages and single application pages are implemented,
//    replace `/job-posts/${row.job_posting_id}` and `/job-applications/${row.id}` to
//    match the correct URLs
// 2. When s3 resume download feature is complete, add download link to corresponding column

function JobApplicationsTable({
  jobApplications,
  totalJobApplicationsNumber,
  page,
  rowsPerPage,
  handlePageRowChange,
}) {
  const formatPhoneNumber = (phoneNumber) =>
    phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");

  const formatPostalCode = (postalCode) =>
    postalCode
      .toUpperCase()
      .replace(/^([A-Za-z]\d[A-Za-z])(\d[A-Za-z]\d)$/, "$1 $2");

  return (
    <TableContainer
      sx={{ marginTop: "35px", width: "100%", padding: "10px 2%" }}
      component={Paper}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, width: "8%" }} align="left">
              Job ID #
            </TableCell>
            <TableCell sx={{ fontWeight: 700, width: "15%" }} align="left">
              Title
            </TableCell>
            <TableCell sx={{ fontWeight: 700, width: "12.5%" }} align="left">
              Applicant Name
            </TableCell>
            <TableCell sx={{ fontWeight: 700, width: "12.5%" }} align="left">
              Email
            </TableCell>
            <TableCell sx={{ fontWeight: 700, width: "10%" }} align="left">
              Phone
            </TableCell>
            <TableCell sx={{ fontWeight: 700, width: "10%" }} align="left">
              Postal Code
            </TableCell>
            <TableCell sx={{ fontWeight: 700, width: "10%" }} align="left">
              Date Applied
            </TableCell>
            <TableCell sx={{ fontWeight: 700, width: "10%" }} align="left">
              Status
            </TableCell>
            <TableCell sx={{ fontWeight: 700, width: "8%" }} align="left">
              Resume
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobApplications.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">
                <Link href={`/job-posts/${row.job_posting_id}`}>
                  {row.title}
                </Link>
              </TableCell>
              <TableCell align="left">
                <Link href={`/job-applications/${row.id}`}>{row.name}</Link>
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{formatPhoneNumber(row.phone)}</TableCell>
              <TableCell align="left">
                {formatPostalCode(row.postal_code)}
              </TableCell>
              <TableCell align="left">
                {/* Expect createdAt to be formated as date for ease of formatting */}
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
        <TableFooter>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell colSpan={9} sx={{ paddingTop: "0" }}>
              <TablePagination
                sx={{ textAlign: "right", boxShadow: "none" }}
                colspan={9}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalJobApplicationsNumber}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) =>
                  handlePageRowChange({ page: parseInt(newPage, 10) })
                }
                onRowsPerPageChange={(e) => {
                  handlePageRowChange({ rows: parseInt(e.target.value, 10) });
                }}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

JobApplicationsTable.propTypes = {
  jobApplications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      job_posting_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      postal_code: PropTypes.string.isRequired,
      resume: PropTypes.string.isRequired,
      status_in_canada: PropTypes.string,
      status_other: PropTypes.string,
      application_status: PropTypes.string.isRequired,
      custom_responses: PropTypes.shape(),
      createdAt: PropTypes.instanceOf(Date).isRequired,
      updatedAt: PropTypes.instanceOf(Date).string,
    }),
  ).isRequired,
  totalJobApplicationsNumber: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handlePageRowChange: PropTypes.func.isRequired,
};

export default JobApplicationsTable;
