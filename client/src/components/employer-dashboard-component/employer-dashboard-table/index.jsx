import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import UserChipComponent from "../../shared/user-chip-component";

function EmployerDashboardTable({
  slicedData,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  count,
  getUserById,
}) {
  const formatDate = (date) => {
    const dateObj = new Date(date);
    return `${
      dateObj.getMonth() + 1
    }/${dateObj.getDate()}/${dateObj.getFullYear()}`;
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
      renderCell: (params) => {
        const owner = getUserById(params.row.owner);
        return <UserChipComponent user={owner} />;
      },
    },
  ];

  const rows = slicedData.map((item, index) => ({
    id: index,
    employerName: item.name,
    date: item.dateAdded,
    phoneNumber: item.phoneNumber,
    email: item.email,
    primaryContact: item.primaryContact ?? "Unknown",
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
  getUserById: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default EmployerDashboardTable;
