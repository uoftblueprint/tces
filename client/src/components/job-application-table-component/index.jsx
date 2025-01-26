import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { fetchAllJobApplications } from "../../utils/job_applications_api";

// TODO edit field values here
const columns = [
  { field: "title", headerName: "Title", width: 70 },
  { field: "applicantName", headerName: "Applicant Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  { field: "phone", headerName: "Phone", width: 130 },
  { field: "postalCode", headerName: "Postal Code", width: 130 },
  { field: "dateApplied", headerName: "Date Applied", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "resume", headerName: "Resume", width: 130 },
];

// format postal code and phone number
// date applied corresopnds to date created
const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

function DataTable() {
  const [jobApplications, setJobApplications] = useState([]);

  const fetchJobApplications = async () => {
    const fetchedJobApplications = await fetchAllJobApplications();
    setJobApplications(fetchedJobApplications.jobApplications);
  };

  // get job applications, turn into array of objects
  useEffect(() => {
    fetchJobApplications();
  }, []);
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={jobApplications}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default DataTable;
