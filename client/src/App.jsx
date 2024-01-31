import "./App.css";
// import ClientEntryComponent from "./components/timeline-entry-components/client-entry-component";
import EmployerEntryComponent from "./components/timeline-entry-components/employer-entry-component";
// import JobEntryComponent from "./components/timeline-entry-components/job-lead-entry-component";

// NOTE: will revert this file after pull request approval (this is for demo purposes only)
/* eslint-disable no-unused-vars */
function App() {
  const contactEntry = {
    id: 1,
    dateAdded: "2024-01-26T09:00:00.000Z",
    type: "contact",
    title: "Employee Name Contacted Client",
    body: "Sample text that mentions a name: John Smith, mentions a job posting: Receptionist #123, and contains regular text for the rest of the posting, like a note would. The text continues lorem ipsum dolor sit.",
    client: null,
    jobLead: null,
    employerContact: null,
  };

  const updateEntry = {
    id: 2,
    dateAdded: "2024-01-26T09:00:00.000Z",
    type: "update",
    title: "Employee Name Updated Email",
    body: "email@email.com",
    client: null,
    jobLead: null,
    employerContact: null,
  };

  const noteEntry = {
    id: 3,
    dateAdded: "2024-01-26T09:00:00.000Z",
    type: "note",
    title: "Employee Name Added Note",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla...",
    client: null,
    jobLead: null,
    employerContact: null,
  };

  const placementEntry = {
    id: 4,
    dateAdded: "2024-01-26T09:00:00.000Z",
    type: "placement",
    title: "Employee Name Placed Job Seeker",
    body: "John Smith was placed in Receptionist123",
    client: null,
    jobLead: null,
    employerContact: null,
  };

  const jobEntry = {
    id: 5,
    dateAdded: "2024-01-26T09:00:00.000Z",
    type: "job",
    title: "Employee Name Added Job Lead",
    body: "Receptionist123",
    client: null,
    jobLead: null,
    employerContact: null,
    typeJob: "delete",
  };

  return (
    // <ClientEntryComponent entry={placementEntry} />
    <EmployerEntryComponent entry={placementEntry} />
    // <JobEntryComponent entry={placementEntry} />
  );
}

export default App;