import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import UserType from "../../../../prop-types/UserType";
import EmployerNoJobLeadOverlay from "./no-employer-job-leads-overlay";

function EmployerJobLeadTableComponent({
  managedJobLeads,
  isLoading,
  paginationModel,
  setPaginationModel,
  totalRowCount,
}) {
  const navigate = useNavigate();
  const handleJobLeadNavClick = (jobLeadId) => {
    navigate(`/job-leads/${jobLeadId}`);
  };

  const columns = [
    {
      field: "jobTitle",
      headerName: "Title",
      width: 200,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleJobLeadNavClick(params.row.jobLeadID)}
          style={{
            textDecoration: "underline",
            color: "#3568E5",
            textTransform: "none",
            padding: 0,
            textAlign: "left",
            justifyContent: "flex-start",
          }}
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "expirationDate",
      headerName: "Expiry Date",
      width: 200,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "compensation",
      headerName: "Compensation",
      width: 200,
      editable: false,
      sortable: false,
      filterable: false,
      valueGetter: (params) => {
        const min =
          params.row.compensationMin !== null
            ? params.row.compensationMin.toFixed(2)
            : 0;
        const max =
          params.row.compensationMax !== null
            ? params.row.compensationMax.toFixed(2)
            : 0;
        if (min !== null && max !== null) {
          return `$${min}-$${max}`;
        }
        if (min !== null) {
          return `$${min}`;
        }
        return `$${max}`;
      },
    },
    {
      field: "employmentType",
      headerName: "Job Type",
      width: 200,
      editable: false,
      sortable: false,
      filterable: false,
    },
  ];

  if (managedJobLeads.length < 1 && !isLoading)
    return <EmployerNoJobLeadOverlay />;

  return (
    <DataGrid
      sx={{
        border: "none",
        minHeight: "500px",
        "& .MuiDataGrid-virtualScroller": {
          overflowX: "auto",
        },
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
      rows={managedJobLeads}
      columns={columns}
      loading={isLoading}
      pageSizeOptions={[10]}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      disableColumnSelector
      disableColumnMenu
    />
  );
}

EmployerJobLeadTableComponent.propTypes = {
  managedJobLeads: PropTypes.arrayOf(UserType).isRequired,
  isLoading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  paginationModel: PropTypes.object.isRequired,
  setPaginationModel: PropTypes.func.isRequired,
  totalRowCount: PropTypes.number.isRequired,
};

export default EmployerJobLeadTableComponent;
