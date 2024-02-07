import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, Link, Avatar, Chip } from "@mui/material";


function ClientTable({
  clientData,
  paginationModel,
  setPaginationModel,
  totalRowCount,
}) {

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 175,
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
      renderCell: (params) => (
        <Chip label={params.value} />
      ),
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
        const getInitials = (name) => {
          return name
            .split(" ")
            .map((n) => n[0])
            .join("");
        };

        return (
          <Chip avatar={<Avatar>{getInitials(params.value)}</Avatar>} label={params.value} />
        );
      },
    },
  ];

  return (
    <Card>
      <Box sx={{ padding: "10px 10px", width: "calc(100% - 60px)" }}>
        <DataGrid
          sx={{ border: 'none' }}
          rowCount={totalRowCount}
          rows={clientData}
          columns={columns}
          pageSizeOptions={[10]}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          disableColumnSelector
          disableColumnMenu
        />
      </Box>
    </Card>
  );
}

ClientTable.propTypes = {
  // eslint-disable-next-line
  clientData: PropTypes.arrayOf(PropTypes.object).isRequired,
  // eslint-disable-next-line
  paginationModel: PropTypes.object.isRequired,
  setPaginationModel: PropTypes.func.isRequired,
  totalRowCount: PropTypes.number.isRequired,
};

export default ClientTable;
