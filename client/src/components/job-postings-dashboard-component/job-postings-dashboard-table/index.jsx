import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import JobTypeChipsComponent from "../../view-job-posts-component/job-type-chips-component";

const statuses = ["Active", "Draft", "Inactive"];
const randomStatus = () => randomArrayItem(statuses);

const initialRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    status: randomStatus(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    status: randomStatus(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    status: randomStatus(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    status: randomStatus(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    status: randomStatus(),
  },
];

export default function JobPostingsDashboardTableComponent() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [rowDelete, setRowDelete] = React.useState(null);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      const newEvent = { ...event };
      newEvent.defaultMuiPrevented = true;
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
    );
  };

  const handleEditClick = (id) => () => {
    setRowModesModel((prevModel) => ({
      ...prevModel,
      [id]: { mode: GridRowModes.Edit },
    }));
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleOpenDialog = (id) => () => {
    setRowDelete(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setRowDelete(null);
  };

  const handleDeleteConfirm = () => {
    if (rowDelete !== null) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== rowDelete));
    }
    handleCloseDialog();
  };

  const columns = [
    {
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(params.id)}
          onChange={() => handleCheckboxChange(params.id)}
        />
      ),
    },
    {
      field: "name",
      headerName: "Title",
      flex: 1, // Use flex for responsive column resizing
      editable: true,
      cellClassName: "wrap-text",
      headerClassName: "header-class",
    },
    {
      field: "age",
      headerName: "Employer",
      type: "string",
      flex: 1, // Use flex here too
      cellClassName: "wrap-text",
      headerClassName: "header-class",
    },
    {
      field: "joinDate",
      headerName: "Close Date",
      type: "date",
      width: 200, // Fixed width for date
      headerClassName: "header-class",
    },
    {
      field: "status",
      headerName: "Status",
      width: 200, // Fixed width for status column
      type: "singleSelect",
      renderCell: (params) => (
        <JobTypeChipsComponent jobTypes={[params.value]} />
      ),
      headerClassName: "header-class",
    },
    {
      field: "actions",
      type: "actions",
      width: 120, // Adjusted width for actions
      marginLeft: "20px",
      cellClassName: "actions",
      headerClassName: "header-class",
      getActions: ({ id }) => {
        if (selectedRows.includes(id)) {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              onClick={handleEditClick(id)}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleOpenDialog(id)}
            />,
          ];
        }
        return [];
      },
    },
  ];

  return (
    <Box
      sx={{
        padding: "20px",
        marginRight: "30px",
        marginLeft: "auto",
        marginBottom: "20px",
        overflowX: "hidden", // Prevent horizontal scrolling
        width: "100%", // Ensure container takes full width
        "& .actions": {
          color: "text.secondary",
        },
        "& .wrap-text": {
          whiteSpace: "normal !important",
          wordWrap: "break-word !important",
        },
        "& .header-class": {
          fontWeight: "bold",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Button
          sx={{
            marginLeft: "auto",
            marginBottom: "30px",
            marginRight: "20px",
            marginTop: "20px",
            width: "100px",
            backgroundColor: "#3568E5",
            color: "white",
            "&:hover": {
              backgroundColor: "#3568E5",
              color: "white",
            },
          }}
          startIcon={<AddIcon />}
          onClick={() => navigate("/job-posts/add")}
        >
          NEW
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        autoHeight // Dynamically adjusts height based on the number of rows
        disableColumnMenu
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        sx={{
          // Prevent vertical scroll by hiding overflow
          "& .MuiDataGrid-virtualScroller": {
            overflowY: "hidden !important", // Explicitly disable vertical scrolling
          },
        }}
      />
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>ARE YOU SURE?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This entry will be deleted and this action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
