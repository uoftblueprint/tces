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
import UserType from "../../prop-types/UserType";

import { DashboardContainer, HeaderContainer } from "./index.styles";

function UserManagement({ managedUsers, onRemoveUser }) {
  const navigate = useNavigate();
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
            onClick={() => navigate(`/admin/edit-user/${params.id}`)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            color="inherit"
            className="actionButton"
            onClick={() => {
              onRemoveUser(params.id);
            }}
          />,
        ];
      },
    },
  ];
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState(managedUsers);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = managedUsers.filter((row) => {
      return row.name.toLowerCase().includes(query.toLowerCase());
    });
    setFilteredRows(filtered);
  };

  const handleFilterReset = () => {
    setSearchQuery("");
    setFilteredRows(managedUsers);
  };

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  return (
    <DashboardContainer>
      <HeaderContainer>
        <ArrowBackIcon
          onClick={handleBackClick}
          sx={{ color: "gray", marginRight: 2, marginLeft: 2 }}
        />
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
    </DashboardContainer>
  );
}

UserManagement.propTypes = {
  managedUsers: PropTypes.arrayOf(UserType).isRequired,
  onRemoveUser: PropTypes.func.isRequired,
  // eslint-disable-next-line
};

export default UserManagement;
