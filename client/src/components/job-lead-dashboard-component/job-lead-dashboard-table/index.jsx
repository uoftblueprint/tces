// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import UserType from "../../../prop-types/UserType";
import UserChipComponent from "../../shared/user-chip-component";

function JobLeadDashboardTableComponent({
  managedJobLeads,
  getUserById,
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
      width: 150,
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
      field: "compensation",
      headerName: "Compensation",
      width: 150,
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
      field: "hoursPerWeek",
      headerName: "Hours/week",
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "employmentType",
      headerName: "Type",
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "creationDate",
      headerName: "Date Created",
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "expirationDate",
      headerName: "Expiry Date",
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "ownerID",
      headerName: "Owner",
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const user = getUserById(params.row.ownerID);
        return <UserChipComponent user={user} />;
      },
    },
    {
      field: "noc",
      headerName: "NOC Code",
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
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

JobLeadDashboardTableComponent.propTypes = {
  managedJobLeads: PropTypes.arrayOf(UserType).isRequired,
  getUserById: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  paginationModel: PropTypes.object.isRequired,
  setPaginationModel: PropTypes.func.isRequired,
  totalRowCount: PropTypes.number.isRequired,

  // eslint-disable-next-line
};

export default JobLeadDashboardTableComponent;
