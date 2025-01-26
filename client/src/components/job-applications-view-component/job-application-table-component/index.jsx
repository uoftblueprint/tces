// import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { fetchAllJobApplications } from "../../utils/job_applications_api";
// import { getAllJobPosts } from "../../utils/job_posts_api";
import "./index.styles";

// TODO edit field values here
// const columns = [
//   { field: "title", headerName: "Title", width: 130 },
//   { field: "applicantName", headerName: "Applicant Name", width: 130 },
//   { field: "email", headerName: "Email", width: 130 },
//   { field: "phone", headerName: "Phone", width: 130 },
//   { field: "postalCode", headerName: "Postal Code", width: 130 },
//   { field: "dateApplied", headerName: "Date Applied", width: 130 },
//   { field: "status", headerName: "Status", width: 130 },
//   { field: "resume", headerName: "Resume", width: 130 },
// ];

// format postal code and phone number
// date applied corresopnds to date created
// const paginationModel = { page: 0, pageSize: 5 };

function DataTable() {
  // const [jobApplications, setJobApplications] = useState([]);
  const jobApplications = [
    {
      title: "frontend dev",
      name: "me hallo",
      phone: "1234567890",
      email: "hallo",
      postal_code: "a1s2d3",
      createdAt: "jan 1",
      application_status: "new",
      resume: "hello.txt",
    },
  ];

  // Note: API here returns request promise object, NOT json
  // const formatJobPostingMap = async () => {
  //   const request = await getAllJobPosts("");
  //   const data = await request.json();
  //   const jobPostings = data.allJobPosts.data;
  //   const jobPostingsMap = {};

  //   jobPostings.forEach((jobPosting) => {
  //     if (!(jobPosting.id in jobPostingsMap)) {
  //       jobPostingsMap[jobPosting.id] = jobPosting.title;
  //     }
  //   });

  //   return jobPostingsMap;
  // };

  // Note: fetchAllJobApplications api gets response in json, not a promise
  // const fetchJobApplications = async () => {
  //   const response = await fetchAllJobApplications();
  //   const jobPostingMap = await formatJobPostingMap();

  //   const rawJobApplications = response.jobApplications;
  //   const formattedJobApplications = rawJobApplications.map(
  //     (jobApplication) => {
  //       return {
  //         ...jobApplication,
  //         title: jobPostingMap[jobApplication.id],
  //       };
  //     },
  //   );
  //   console.log(formattedJobApplications)
  // setJobApplications(formattedJobApplications);
  // };

  // get job applications, turn into array of objects
  // useEffect(() => {
  //   // fetchJobApplications();
  // }, []);
  return (
    <TableContainer sx={{ width: "90%" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Applicant Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Postal Code</TableCell>
            <TableCell align="left">Date Applied</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Resume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobApplications.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell className=".half-a-border-on-top" align="left">
                {row.title}
              </TableCell>
              <TableCell className=".half-a-border-on-top" align="left">
                {row.name}
              </TableCell>
              <TableCell className=".half-a-border-on-top" align="left">
                {row.email}
              </TableCell>
              <TableCell className=".half-a-border-on-top" align="left">
                {row.phone}
              </TableCell>
              <TableCell className=".half-a-border-on-top" align="left">
                {row.postal_code}
              </TableCell>
              <TableCell className=".half-a-border-on-top" align="left">
                {row.createdAt}
              </TableCell>
              <TableCell className=".half-a-border-on-top" align="left">
                {row.application_status}
              </TableCell>
              <TableCell className=".half-a-border-on-top" align="left">
                {row.resume}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;
