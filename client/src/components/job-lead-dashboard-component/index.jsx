import * as React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import UserType from "../../prop-types/UserType";
import ConfirmDialog from "../shared/confirm-dialog-component";

import { DashboardContainer, HeaderContainer } from "./index.styles";
import { deleteUser } from "../../utils/api";
import ErrorComponent from "../shared/error-screen-component";

function JobLeadDashboardComponent({ managedJobLeads }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState(managedJobLeads);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    setFilteredRows(managedJobLeads);
  }, [managedJobLeads]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = managedJobLeads.filter((row) => {
      return row.displayName.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredRows(filtered);
  };

  const handleFilterReset = () => {
    setSearchQuery("");
    setFilteredRows(managedJobLeads);
  };

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  const handleDeleteClick = (userID) => {
    setUserToDelete(userID);
    setConfirmDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete !== null) {
      setErrorMessage("");
      try {
        const response = await deleteUser(userToDelete);
        if (response.ok) {
          // this will invoke a re-render so an api to fetch
          // updated users will take place as soon as this is called
          console.log("delete");
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "User deletion failed.");
        }
      } catch (error) {
        setErrorMessage("An error occurred during your request.");
      }
      setUserToDelete(null);
    }
    setConfirmDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteDialog(false);
    setUserToDelete(null);
  };

  const columns = [
    {
      field: "displayName",
      headerName: "Name",
      width: 535,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 535,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 160,
      hide: true,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary actionButton"
            color="inherit"
            onClick={() => navigate(`/admin/edit-user/${params.row.userID}`)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            className="actionButton"
            onClick={() => handleDeleteClick(params.row.userID)}
          />,
        ];
      },
    },
  ];

  if (errorMessage) {
    return <ErrorComponent message={errorMessage} />;
  }

  return (
    <div>
      <DashboardContainer>
        <HeaderContainer>
          <ArrowBackIcon
            onClick={handleBackClick}
            sx={{
              color: "gray",
              marginRight: 2,
              marginLeft: 2,
              cursor: "pointer",
            }}
          />

          <div>
            <Typography
              style={{
                fontFamily: "Arial",
                fontSize: "34px",
                fontWeight: 500,
                lineHeight: "42px",
                letterSpacing: "0.25px",
                textAlign: "left",
              }}
            >
              Job Leads
            </Typography>
            <Typography
              style={{
                fontFamily: "Arial",
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "24px",
                letterSpacing: "0.15px",
                textAlign: "left",
              }}
            >
              {filteredRows.length} Job Leads
            </Typography>
          </div>

          <Box sx={{ marginLeft: "auto", display: "flex" }}>
            <Button
              sx={{
                marginLeft: "auto",
                marginBottom: "30px",
                marginRight: "30px",
                marginTop: "30px",
                backgroundColor: "white",
                border: "1px solid #3568E5",
                color: "#3568E5",
                "&:hover": {
                  backgroundColor: "#3568E5",
                  color: "white",
                },
              }}
              startIcon={<DownloadIcon />}
              onClick={() => {}}
            >
              EXPORT CURRENT FILTER VIEW ({filteredRows.length} Job Leads)
            </Button>
            <Button
              sx={{
                marginLeft: "auto",
                marginBottom: "30px",
                marginTop: "30px",
                backgroundColor: "#3568E5",
                color: "white",
                "&:hover": {
                  backgroundColor: "#3568E5",
                  color: "white",
                },
              }}
              startIcon={<AddIcon />}
              onClick={() => navigate("/admin/create-user")}
            >
              ADD NEW JOB LEAD
            </Button>
          </Box>
        </HeaderContainer>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gridColumnGap: "30px",
            height: 400,
            width: "100%",
          }}
        >
          <Card sx={{ width: 235, height: 175, marginLeft: 2 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                align="left"
                gutterBottom
              >
                Name
              </Typography>
              <Typography sx={{ mb: 0.5 }} color="text.secondary">
                <TextField
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  size="small"
                  style={{
                    borderWidth: "10px",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleFilterReset}>
                Reset Filters
              </Button>
            </CardActions>
          </Card>
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
            rows={filteredRows}
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
        </Box>
        <ConfirmDialog
          open={confirmDeleteDialog}
          title="Confirm Delete"
          message="Are you sure you want to delete this user?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </DashboardContainer>
    </div>
  );
}

JobLeadDashboardComponent.propTypes = {
  managedJobLeads: PropTypes.arrayOf(UserType).isRequired,
  // eslint-disable-next-line
};

export default JobLeadDashboardComponent;
