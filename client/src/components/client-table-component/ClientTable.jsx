import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, Link, Typography, Avatar } from "@mui/material";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 175,
    renderCell: (params) => (
      <Link href={`/clients/${params.id}`} underline="hover">
        {params.value}
      </Link>
    ),
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 175,
  },
  {
    field: "email",
    headerName: "Email",
    width: 175,
    renderCell: (params) => (
      <Link href={`mailto:${params.value}`} underline="hover">
        {params.value}
      </Link>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    width: 175,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ececec",
          borderRadius: "30%",
          width: "fit-content",
          padding: "3px 8px",
          fontWeight: "bold",
        }}
      >
        <Typography variant="body2" component="span">
          {params.value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "dateUpdated",
    headerName: "Date Updated",
    width: 175,
  },
  {
    field: "owner",
    headerName: "Owner",
    width: 175,
    renderCell: (params) => {
      // Function to extract initials from a full name
      const getInitials = (name) => {
        return name
          .split(" ")
          .map((n) => n[0])
          .join("");
      };

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: "#ececec",
            borderRadius: "30%",
            width: "fit-content",
            padding: "4px 4px",
          }}
        >
          <Avatar sx={{ width: 22, height: 22, fontSize: "12px" }}>
            {getInitials(params.value)}
          </Avatar>
          <Box>{params.value}</Box>
        </Box>
      );
    },
  },
];

const mockRows = [
  {
    id: 1,
    name: "First Last",
    phone: "+1 111 111 1111",
    email: "email@email.com",
    status: "Active",
    dateUpdated: "1/1/2022",
    owner: "Emily Gazo",
  },
  {
    id: 1,
    name: "First Last",
    phone: "+1 111 111 1111",
    email: "email@email.com",
    status: "Active",
    dateUpdated: "1/1/2022",
    owner: "Emily Gazo",
  },
  {
    id: 1,
    name: "First Last",
    phone: "+1 111 111 1111",
    email: "email@email.com",
    status: "Active",
    dateUpdated: "1/1/2022",
    owner: "Emily Gazo",
  },
  {
    id: 1,
    name: "First Last",
    phone: "+1 111 111 1111",
    email: "email@email.com",
    status: "Active",
    dateUpdated: "1/1/2022",
    owner: "Emily Gazo",
  },
  {
    id: 1,
    name: "First Last",
    phone: "+1 111 111 1111",
    email: "email@email.com",
    status: "Active",
    dateUpdated: "1/1/2022",
    owner: "Emily Gazo",
  },
  {
    id: 1,
    name: "First Last",
    phone: "+1 111 111 1111",
    email: "email@email.com",
    status: "Active",
    dateUpdated: "1/1/2022",
    owner: "Emily Gazo",
  },
  {
    id: 1,
    name: "First Last",
    phone: "+1 111 111 1111",
    email: "email@email.com",
    status: "Active",
    dateUpdated: "1/1/2022",
    owner: "Emily Gazo",
  },
  {
    id: 1,
    name: "First Last",
    phone: "+1 111 111 1111",
    email: "email@email.com",
    status: "Active",
    dateUpdated: "1/1/2022",
    owner: "Emily Gazo",
  },
  {
    id: 1,
    name: "First Last",
    phone: "+1 111 111 1111",
    email: "email@email.com",
    status: "Active",
    dateUpdated: "1/1/2022",
    owner: "Emily Gazo",
  },
  {
    id: 1,
    name: "First Last",
    phone: "+1 111 111 1111",
    email: "email@email.com",
    status: "Active",
    dateUpdated: "1/1/2022",
    owner: "Emily Gazo",
  },
  {
    id: 1,
    name: "First Last",
    phone: "+1 111 111 1111",
    email: "email@email.com",
    status: "Active",
    dateUpdated: "1/1/2022",
    owner: "Emily Gazo",
  },
];

function ClientTable() {
  return (
    <Card>
      <Box sx={{ padding: "10px 10px", width: "100%" }}>
        <DataGrid rows={mockRows} columns={columns} sx={{ border: 0 }} />
      </Box>
    </Card>
  );
}

export default ClientTable;
