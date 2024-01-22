import PropTypes from "prop-types";
import { Chip, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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

  const columns = [
    { field: "employerName", headerName: "Employer Name", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueFormatter: ({ value }) => formatDate(value),
    },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "primaryContact", headerName: "Primary Contact", flex: 1 },
    {
      field: "owner",
      headerName: "Owner",
      flex: 1,
      renderCell: (params) => (
        <Chip
          avatar={<Avatar>{/* logic for the avatar */}</Avatar>}
          label={params.value}
        />
      ),
    },
  ];

  const rows = slicedData.map((item, index) => ({
    id: index,
    employerName: item.employerName,
    date: item.date,
    phoneNumber: item.phoneNumber,
    email: item.email,
    primaryContact: item.primaryContact,
    owner: item.owner,
  }));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={rowsPerPage}
      page={page - 1}
      onPageSizeChange={(newPageSize) =>
        handleChangeRowsPerPage({ target: { value: newPageSize } })
      }
      onPageChange={(newPage) => handleChangePage(null, newPage)}
      rowCount={count}
      pagination
      paginationMode="server"
      sx={{
        background: "white",
      }}
    />
);
}

EmployerDashboardTable.propTypes = {
  // eslint-disable-next-line
  slicedData: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default EmployerDashboardTable;
