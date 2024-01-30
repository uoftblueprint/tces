import PropTypes from "prop-types";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import UserChipComponent from "../../shared/user-chip-component";
import UserType from "../../../prop-types/UserType";

function EmployerDashboardTable({
  managedEmployers,
  paginationModel,
  rowsPerPage,
  setPaginationModel,
  count,
  getUserById,
  isLoading,
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

  const rows = managedEmployers.map((item, index) => ({
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
      sx={{
        minHeight: "540px",
        "& .actionButton": {
          display: "none",
        },
        [`& .${gridClasses.row}:hover`]: {
          ".actionButton": {
            display: "block",
          },
        },
        background: "white",
      }}
      rows={rows}
      columns={columns}
      loading={isLoading}
      pageSize={rowsPerPage}
      pageSizeOptions={[10]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      rowCount={count}
      disableColumnSelector
      disableColumnMenu
      paginationMode="server"
    />
  );
}

EmployerDashboardTable.propTypes = {
  // eslint-disable-next-line
  managedEmployers: PropTypes.arrayOf(UserType).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  paginationModel: PropTypes.object.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  getUserById: PropTypes.func.isRequired,
  setPaginationModel: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default EmployerDashboardTable;
