import PropTypes from "prop-types";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { Link, Chip } from "@mui/material";
import UserChipComponent from "../../shared/user-chip-component";

function ClientTable({
  clientData,
  paginationModel,
  setPaginationModel,
  totalRowCount,
  getUserById,
  isLoading,
}) {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Link href={`/clients/${params.id}`} underline="hover">
          {params.value}
        </Link>
      ),
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 175,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 175,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Link href={`mailto:${params.value}`} underline="hover">
          {params.value}
        </Link>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 175,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => <Chip label={params.value === "R And I" ? "R&I" : (params.value ?? "unknown")} />,
    },
    {
      field: "dateUpdated",
      headerName: "Date Updated",
      width: 175,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "owner",
      headerName: "Owner",
      width: 175,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const user = getUserById(params.row.ownerID);
        return <UserChipComponent user={user} />;
      },
    },
  ];

  return (
    <DataGrid
      sx={{
        minHeight: "500px",
        "& .actionButton": {
          display: "none",
        },
        [`& .${gridClasses.row}:hover`]: {
          ".actionButton": {
            display: "block",
          },
        },
      }}
      rowCount={totalRowCount}
      rows={clientData}
      loading={isLoading}
      columns={columns}
      pageSizeOptions={[10]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      disableColumnSelector
      disableColumnMenu
    />
  );
}

ClientTable.propTypes = {
  // eslint-disable-next-line
  clientData: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line
  paginationModel: PropTypes.object.isRequired,
  setPaginationModel: PropTypes.func.isRequired,
  totalRowCount: PropTypes.number.isRequired,
  getUserById: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ClientTable;
