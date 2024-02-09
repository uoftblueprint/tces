import PropTypes from "prop-types";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import UserChipComponent from "../../shared/user-chip-component";
import UserType from "../../../prop-types/UserType";

function EmployerDashboardTable({
  managedEmployers,
  paginationModel,
  rowsPerPage,
  setPaginationModel,
  getUserById,
  isLoading,
  totalRowCount,
}) {
  const navigate = useNavigate();
  const handleEmployerNavClick = (employerId) => {
    navigate(`/employers/${employerId}`);
  };

  const formatDate = (date) => {
    const dateObj = new Date(date);
    return `${
      dateObj.getMonth() + 1
    }/${dateObj.getDate()}/${dateObj.getFullYear()}`;
  };

  const columns = [
    {
      headerName: "Employer Name",
      editable: false,
      sortable: false,
      filterable: false,
      flex: 1,
      renderCell: (params) => (
        <Button
          onClick={() => handleEmployerNavClick(params.row.employerID)}
          style={{
            textDecoration: "underline",
            color: "#3568E5",
            textTransform: "none",
            padding: 0,
            textAlign: "left",
            justifyContent: "flex-start",
          }}
        >
          {params.row.employerName}
        </Button>
      ),
    },
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
    employerID: item.employerID,
    employerName: item.name,
    date: item.dateAdded,
    phoneNumber: item.phoneNumber,
    email: item.email,
    primaryContact: item.primaryContact ?? "Unknown",
    owner: item.ownerID,
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
      rowCount={totalRowCount}
      rows={rows}
      columns={columns}
      loading={isLoading}
      pageSize={rowsPerPage}
      pageSizeOptions={[10]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
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
  isLoading: PropTypes.bool.isRequired,
  totalRowCount: PropTypes.number.isRequired,
};

export default EmployerDashboardTable;
