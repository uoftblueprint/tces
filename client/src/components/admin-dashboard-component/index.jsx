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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import UserType from "../../prop-types/UserType";
import ConfirmDialog from "../shared/confirm-dialog-component";

import { DashboardContainer, HeaderContainer } from "./index.styles";
import { deleteUser, getAllUsers } from "../../utils/api";
import ErrorComponent from "../shared/error-screen-component";

function AdminDashboardComponent({ managedUsers, removeUser }) {
  const navigate = useNavigate();
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [initialLoad, setInitialLoad] = React.useState(true);
  const [noFilterMode, setNoFilterMode] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState(managedUsers);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [rowCount, setRowCount] = React.useState(managedUsers.length);
  const [ignorePaginationChange, setIgnorePaginationChange] =
    React.useState(false);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  React.useEffect(() => {
    setFilteredRows(managedUsers);
  }, [managedUsers]);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const generateFilterParams = (filterParams, page = null, pageSize = null) => {
    const queryParams = new URLSearchParams({});
    if (pageSize || page) {
      queryParams.append("page", page);
      queryParams.append("pageSize", pageSize);
    }
    queryParams.append("avoidAdmins", true);

    // early return if no filter params are provided
    if (!filterParams) return queryParams;

    // ensure these filter configs are defined before passing in query
    if (filterParams.searchQuery)
      queryParams.append("name", filterParams.searchQuery);

    return queryParams;
  };

  // helper to generate query params based on pagination model state and filter configs
  const declareFilterJobLeadsQueryParams = (
    filterParams,
    customPageModel = null,
  ) => {
    let { pageSize, page } = paginationModel;
    if (customPageModel) {
      page = customPageModel.page;
      pageSize = customPageModel.pageSize;
      setPaginationModel(customPageModel);
    }

    return generateFilterParams(filterParams, page, pageSize);
  };

  // function to handle the apply filter button
  const handleApplyFilter = async (filterParams, customPageModel = null) => {
    const queryParams = declareFilterJobLeadsQueryParams(
      filterParams,
      customPageModel,
    );

    // fetch the data
    try {
      setLoading(true);
      const response = await getAllUsers(queryParams.toString());
      if (response.ok) {
        const usersData = await response.json();

        const formattedUsers = usersData.data.rows.map((user) => ({
          userID: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          isAdmin: user.is_admin,
          id: user.id,
          displayName: `${user.first_name} ${user.last_name}`,
        }));
        setFilteredRows(formattedUsers);
        setRowCount(usersData.data.count);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Fetch failed.");
      }
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterReset = () => {
    setNoFilterMode(true);
    setSearchQuery("");
    setIgnorePaginationChange(true);
    // we want to reset pagination model when we apply a filter
    handleApplyFilter(null, {
      pageSize: 10,
      page: 0,
    });
  };

  const applyFilters = (isInvokedByPageChange = false) => {
    const filterParams = {
      searchQuery,
    };
    setIgnorePaginationChange(true);
    let customPageModel = null;
    if (!isInvokedByPageChange) {
      customPageModel = {
        pageSize: 10,
        page: 0,
      };
    } else {
      setIgnorePaginationChange(false);
    }
    // we want to reset pagination model when we apply a filter
    handleApplyFilter(filterParams, customPageModel);
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
          removeUser(userToDelete);
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
    applyFilters(false);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteDialog(false);
    setUserToDelete(null);
  };

  React.useEffect(() => {
    if (!initialLoad && !ignorePaginationChange) {
      if (noFilterMode) {
        handleApplyFilter(null);
      } else {
        applyFilters(true);
      }
    } else {
      setInitialLoad(false);
      setIgnorePaginationChange(false);
    }
  }, [paginationModel]);

  // triggers on initialization of job leads dashboard screen
  React.useEffect(() => {
    // fetch job leads with default configs
    const initialFetch = async () => {
      await handleApplyFilter(null);
    };
    initialFetch().then(() => setInitialLoading(false));
  }, []);

  const columns = [
    {
      field: "displayName",
      headerName: "Name",
      width: 400,
      editable: false,
      sortable: false,
      filterable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 400,
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
          <IconButton
            sx={{
              marginRight: 2,
              marginLeft: 2,
            }}
            onClick={handleBackClick}
            size="small"
          >
            <ArrowBackIcon
              onClick={handleBackClick}
              sx={{
                color: "gray",

                cursor: "pointer",
              }}
            />
          </IconButton>

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
            Admin Dashboard
          </Typography>
          <Button
            sx={{
              marginLeft: "auto",
              marginBottom: "30px",
              marginTop: "30px",
              backgroundColor: "#47B787",
              color: "white",
              "&:hover": {
                backgroundColor: "#47B787",
                color: "white",
              },
            }}
            onClick={() => {}}
          >
            Import CSV
          </Button>
          <Button
            sx={{
              marginLeft: "30px",
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
            New Users
          </Button>
        </HeaderContainer>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gridColumnGap: "30px",
            height: "100%",
            width: "100%",
          }}
        >
          <Card sx={{ width: 250, marginLeft: 4, marginBottom: 4, height: "fit-content" }}>
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
            <CardActions
              sx={{ display: "flex", p: 2, flexDirection: "column" }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setNoFilterMode(false);
                  applyFilters(false)
                }}
                sx={{ width: "100%" }}
              >
                APPLY FILTER
              </Button>
              <Button
                onClick={handleFilterReset}
                sx={{ mt: 2, alignSelf: "flex-start" }}
              >
                RESET FILTERS
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
            rowCount={rowCount}
            loading={loading || initialLoading}
            pageSizeOptions={[10]}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
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

AdminDashboardComponent.propTypes = {
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  removeUser: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default AdminDashboardComponent;
