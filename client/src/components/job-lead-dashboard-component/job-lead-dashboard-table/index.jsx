// eslint-disable-next-line no-unused-vars
import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import UserType from "../../../prop-types/UserType";

function JobLeadDashboardTableComponent({ managedJobLeads }) {
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
        const min = params.row.compensationMin.toFixed(2);
        const max = params.row.compensationMax.toFixed(2);
        if (min && max) {
          return `$${min}-$${max}`;
        }
        if (min) {
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
      field: "creatorID",
      headerName: "Owner",
      width: 150,
      editable: false,
      sortable: false,
      filterable: false,
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
        width: 1100,
        height: 592,
        "& .actionButton": {
          display: "none",
        },
        [`& .${gridClasses.row}:hover`]: {
          ".actionButton": {
            display: "block",
          },
        },
      }}
      rows={managedJobLeads}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10]}
      disableColumnSelector
      disableColumnMenu
    />
  );
}

JobLeadDashboardTableComponent.propTypes = {
  managedJobLeads: PropTypes.arrayOf(UserType).isRequired,
  // eslint-disable-next-line
};

export default JobLeadDashboardTableComponent;
