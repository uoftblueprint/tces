import * as React from "react";
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

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 535,
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    width: 535,
    editable: false,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "",
    width: 160,
    hide: true,
    cellClassName: "actions",
    getActions: () => {
      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary actionButton"
          // onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="inherit"
          className="actionButton"
        />,
      ];
    },
  },
];

const rows = [
  { id: 1, name: "First Last", email: "email@email.com" },
  { id: 2, name: "First Last", email: "email@email.com" },
  { id: 3, name: "First Last", email: "email@email.com" },
  { id: 4, name: "First Last", email: "email@email.com" },
  { id: 5, name: "First Last", email: "email@email.com" },
  { id: 6, name: "First Last", email: "email@email.com" },
  { id: 7, name: "First Last", email: "email@email.com" },
  { id: 8, name: "First Last", email: "email@email.com" },
  { id: 9, name: "First Last", email: "email@email.com" },
  { id: 10, name: "First Last", email: "email@email.com" },
];

export default function DataGridDemo() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState(rows);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = rows.filter((row) =>
      row.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredRows(filtered);
  };

  const handleFilterReset = () => {
    setSearchQuery("");
    setFilteredRows(rows);
  };

  return (
    <div style={{ marginRight: 40 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ArrowBackIcon sx={{ color: "gray", marginRight: 2, marginLeft: 2 }} />
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
        >
          New Users
        </Button>
      </div>

      <Box sx={{ height: 400, width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            // display: "grid",
            // gridTemplateColumns: "1fr auto",
            gridColumnGap: "30px",
            // height: "590px",
            // width: "1400px"
          }}
        >
          <Card sx={{ width: 235, height: 175, marginLeft: 2 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Name
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <TextField
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
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
          />
        </div>
      </Box>
    </div>
  );
}
