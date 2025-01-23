
import { useState , useEffect} from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import JobTypeChipsComponent from "../../view-job-posts-component/job-type-chips-component";
import JobPostsSortMenuComponent from "../../shared/job-posts-sort-menu-component";
import JobPostsStatusMenuComponent from "../../shared/job-posts-status-menu-component";
import { getAllJobPosts} from "../../../utils/job_posts_api";


export default function JobPostingsDashboardTableComponent() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [rowDelete, setRowDelete] = React.useState(null);

  useEffect(() => {
    const fetchJobPosts = async () => {
      try {
        const response = await getAllJobPosts(""); 
        const data = await response.json();
        console.log(data.allJobPosts.data[0].close_date)
        const formattedData = data.allJobPosts.data.map((jobPost) => ({
          id: jobPost.id,
          jobTitle: jobPost.title,
          employer: jobPost.employer,
          closeDate: jobPost.close_date,
          state: jobPost.state,
        }));

        setRows(formattedData);
      } catch (error) {
        console.error("Error fetching job posts:", error.message);
      }
    };
    fetchJobPosts();
  }, []);
  const handleSort = (sortOption) => {
    const sortedRows = [...rows].sort((a, b) => {
      if (sortOption === "ascending") {
        return new Date(a.closeDate) - new Date(b.closeDate);
      }
      if (sortOption === "descending") {
        return new Date(b.closeDate) - new Date(a.closeDate);
      }
      return 0;
    });
    setRows(sortedRows);
  };

  const handleStatus = (sortOption) => {
    const setStatus = rows.filter(
      (row) => row.status.toLocaleLowerCase() === sortOption
    );
    setRows(setStatus);
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

    const handleJobLeadNavClick = (jobLeadId) => {
    navigate(`/job-postings/${jobLeadId}`);
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
      field: "jobTitle",
      headerName: "Title",
      flex: 1,
      editable: true,
      cellClassName: "wrap-text",
      headerClassName: "header-class",
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
      field: "employer",
      headerName: "Employer",
      type: "string",
      flex: 1,
      cellClassName: "wrap-text",
      headerClassName: "header-class",
    },
    {
      field: "closeDate",
      headerName: "Close Date",
      type: "date",
      width: 400,
      headerClassName: "header-class",
      valueGetter: (params) => new Date(params.row.closeDate)

    },
    {
      field: "state",
      headerName: "Status",
      width: 100,
      type: "singleSelect",
      renderCell: (params) => (
        <JobTypeChipsComponent jobTypes={[params.value]} />
      ),
      headerClassName: "header-class",
    },
    {
      field: "actions",
      type: "actions",
      width: 120,
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
        overflowX: "hidden",
        width: "100%",
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
          justifyContent: "space-between",
          marginBottom: "30px",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "-3px",
            marginLeft: "40px",
          }}
        >
          <JobPostsSortMenuComponent applySort={handleSort} />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <JobPostsStatusMenuComponent applySort={handleStatus} />
        </Box>
        <Button
          sx={{
            marginLeft: "30px",
            marginBottom: "30px",
            marginRight: "40px",
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
          onClick={() => navigate("/job-postings/add")}
        >
          NEW
        </Button>
      </Box>
      <Box
        sx={{
          padding: "20px", 
          marginTop: "20px", 
          marginLeft: "20px", 
          marginRight: "20px", 
          borderRadius: "8px", 
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={(params, event) => {
            if (params.reason === GridRowEditStopReasons.rowFocusOut) {
              event.preventDefault();
            }
          }}
          processRowUpdate={processRowUpdate}
          autoHeight
          disableColumnMenu
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          sx={{
            "& .MuiDataGrid-virtualScroller": {
              overflowY: "hidden !important",
            },
          }}
        />
      </Box>
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
