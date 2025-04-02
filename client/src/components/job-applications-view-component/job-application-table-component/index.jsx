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
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PropTypes from "prop-types";
import ApplicationStatusChipComponent from "../../shared/application-status-chips";
import { formatDateStr } from "../../../utils/date";
import { ContentTableCell, HeaderTableCell } from "../index.styles";
import { getResumeUrl } from "../../../utils/job_applications_api";

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

  const handleDownload = async (resume) => {
    const presignedUrlObject = await getResumeUrl(resume);
    const presignedUrl = presignedUrlObject.resume_url;
    if (!presignedUrl) {
      console.error("Failed to retrieve the presigned URL.");
      return;
    }
    window.open(presignedUrl, "_blank");
  };

  return (
    <TableContainer
      sx={{
        marginTop: "35px",
        width: "100%",
        padding: "10px 2%",
        boxSizing: "border-box",
      }}
      component={Paper}
    >
      <Table>
        <TableHead>
          <TableRow>
            <HeaderTableCell sx={{ width: "8%" }}>Job ID #</HeaderTableCell>

            <HeaderTableCell sx={{ width: "15%" }}>Title</HeaderTableCell>

            <HeaderTableCell sx={{ width: "12.5%" }}>
              Applicant Name
            </HeaderTableCell>

            <HeaderTableCell sx={{ width: "12.5%" }}>Email</HeaderTableCell>

            <HeaderTableCell sx={{ width: "10%" }}>Phone</HeaderTableCell>

            <HeaderTableCell sx={{ width: "10%" }}>Postal Code</HeaderTableCell>

            <HeaderTableCell sx={{ width: "10%" }}>
              Date Applied
            </HeaderTableCell>

            <HeaderTableCell sx={{ width: "12%" }}>Status</HeaderTableCell>

            <HeaderTableCell sx={{ width: "8%" }}>Resume</HeaderTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobApplications.map((row) => (
            <TableRow key={row.id}>
              <ContentTableCell>{row.id}</ContentTableCell>

              <ContentTableCell>
                <Link href={`/job-applications/${row.id}`}>
                  {row.job_posting.title}
                </Link>
              </ContentTableCell>

              <ContentTableCell>{row.name}</ContentTableCell>

              <ContentTableCell>{row.email}</ContentTableCell>

              <ContentTableCell>
                {formatPhoneNumber(row.phone)}
              </ContentTableCell>

              <ContentTableCell>
                {formatPostalCode(row.postal_code)}
              </ContentTableCell>

              <ContentTableCell>
                {formatDateStr(row.createdAt)}
              </ContentTableCell>

              <ContentTableCell>
                <ApplicationStatusChipComponent
                  status={[row.application_status]}
                />
              </ContentTableCell>

              {/* Add corresponding resume link  to this columns values */}
              <ContentTableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleDownload(row.resume)}
                >
                  <DownloadIcon />
                </IconButton>
              </ContentTableCell>
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
                  handlePageRowChange({
                    rows: parseInt(e.target.value, 10),
                    page: 0,
                  });
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
