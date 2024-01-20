import PropTypes from "prop-types";
import {
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
} from "@mui/material";

function EmployerDashboardTable({
  slicedData,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  count,
}) {
  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };
  return (
    <TableContainer
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "fit-content",
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Employer Name</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Phone Number</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Primary Contact</TableCell>
            <TableCell align="left">Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflowY: "auto" }}>
          {slicedData.map(
            (
              { employerName, date, phoneNumber, email, primaryContact, owner },
              index,
            ) => (
              <TableRow
                // eslint-disable-next-line react/no-array-index-key
                key={`${employerName}-${index}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{employerName}</TableCell>
                <TableCell align="left">{formatDate(date)}</TableCell>
                <TableCell align="left">{phoneNumber}</TableCell>
                <TableCell align="left">{email}</TableCell>
                <TableCell align="left">{primaryContact}</TableCell>
                <TableCell align="left">
                  <Chip avatar={<Avatar>{/* photo */}</Avatar>} label={owner} />
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

EmployerDashboardTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  slicedData: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default EmployerDashboardTable;
