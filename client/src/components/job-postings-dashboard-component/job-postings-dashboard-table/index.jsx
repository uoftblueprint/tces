import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
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
import Checkbox from "@mui/material/Checkbox";
import JobTypeChipsComponent from "../../view-job-posts-component/job-type-chips-component";
import JobPostsSortMenuComponent from "../../shared/job-posts-sort-menu-component";
import JobPostsStatusMenuComponent from "../../shared/job-posts-status-menu-component";
import ErrorScreenComponent from "../../shared/error-screen-component";
import JobPostsDeleteErrorDialog from "../../shared/job-posts-delete-error-dialog";
import {
  getAllJobPosts,
  deleteJobPost,
  getOneJobPost,
} from "../../../utils/job_posts_api";

export default function JobPostingsDashboardTableComponent() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [rowDelete, setRowDelete] = React.useState(null);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [filterStatus, setFilteredStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [, setLoading] = React.useState(false);
  const [errorOb, setError] = React.useState(null);

  useEffect(() => {
    const fetchJobPosts = async () => {
      const { page, pageSize } = paginationModel;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        status: filterStatus,
        order: sortOrder?.direction,
      });

      try {
        setLoading(true);
        const response = await getAllJobPosts(`?${queryParams.toString()}`);

        if (response.ok) {
          const data = await response.json();
          const formattedData = data.allJobPosts.data.map((jobPost) => ({
            id: jobPost.id,
            jobTitle: jobPost.title,
            employer: jobPost.employer,
            closeDate: jobPost.close_date,
            state: jobPost.state,
          }));
          setRows(formattedData);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Fetch failed.");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobPosts();
  }, [paginationModel, filterStatus, sortOrder]);

  if (errorOb) return <ErrorScreenComponent message={errorOb.message} />;

  const handleStatusChange = (status) => {
    setFilteredStatus(status);
  };

  const handleSortOrderChange = (order) => {
    setSortOrder(order);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id],
    );
  };

  const handleEditClick = (id) => async () => {
    try {
      const response = await getOneJobPost(id);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.status === "success" && data.jobPost) {
        // Pass the jobPostData via state to the EditJobPost component
        navigate(`/all-job-postings/${id}`, {
          state: { jobPostData: data.jobPost, editMode: true },
        });
      } else {
        console.error("Error fetching job post:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch job post:", error);
    }
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

  const handleDeleteConfirm = async () => {
    try {
      await deleteJobPost(rowDelete);
      setRows((prevRows) => prevRows.filter((row) => row.id !== rowDelete));
    } catch (error) {
      setErrorDialogOpen(true);
    }

    handleCloseDialog();
  };

  const handleJobPostingsNavClick = async (jobPostId) => {
    navigate(`/all-job-postings/${jobPostId}`);
    try {
      const response = await getOneJobPost(jobPostId);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success" && data.jobPost) {
        navigate(`/all-job-postings/${jobPostId}`, {
          state: { jobPostData: data.jobPost },
        });
      } else {
        console.error("Error fetching job post:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch job post:", error);
    }
  };

  const columns = [
    {
      // field: "Job ID #",
      width: 60,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        return (
          <Checkbox
            checked={selectedRows.includes(params.id)}
            onChange={() => handleCheckboxChange(params.id)}
          />
        );
      },
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
          onClick={() => handleJobPostingsNavClick(params.row.id)}
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
      valueGetter: (params) => new Date(params.row.closeDate),
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
        boxSizing: "border-box",
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <JobPostsSortMenuComponent
              applySort={(order) => handleSortOrderChange(order)}
            />

            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setFilteredStatus("");
                setSortOrder("");
              }}
              disabled={!filterStatus && !sortOrder}
              sx={{
                textTransform: "none",
                alignSelf: "flex-start",
                borderRadius: "10px",
                fontSize: "12.5px",
                backgroundColor:
                  !filterStatus && !sortOrder ? "#ccc" : "#3568E5",
                color: !filterStatus && !sortOrder ? "#666" : "white",
                "&:hover": {
                  backgroundColor: "#3568E5",
                  color: "white",
                },
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "nowrap",
              }}
            >
              RESET ALL
            </Button>
          </Box>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <JobPostsStatusMenuComponent
            applyStatus={(status) => handleStatusChange(status)}
          />
        </Box>
        <Button
          sx={{
            borderRadius: "8px",
            marginLeft: "30px",
            marginBottom: "30px",
            marginRight: "40px",
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
          pagination
          paginationModel={paginationModel}
          pageSizeOptions={[10, 25, 50]}
          onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
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
            padding: "15px",
            backgroundColor: "white",
            "& .MuiDataGrid-virtualScroller": {
              overflowY: "hidden !important",
            },
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold !important",
            },
            border: "none",
            borderRadius: "10px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
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
      <JobPostsDeleteErrorDialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
      />
    </Box>
  );
}
