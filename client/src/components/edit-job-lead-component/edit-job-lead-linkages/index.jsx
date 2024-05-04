import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconButton,
  Box,
  CircularProgress,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { HeaderContainer } from "../index.styles";
import { getFilteredClients } from "../../../utils/api";
import JobLeadType from "../../../prop-types/JobLeadType";

function EditJobLeadLinkagesComponent({ jobLead }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClients() {
      const queryParams = new URLSearchParams();
      queryParams.append("job_lead_placement", jobLead.id);
      try {
        const response = await getFilteredClients(queryParams);
        setClients(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, [jobLead.id]);

  if (loading) {
    return (
      <Box
        sx={{
          width: "90%",
          borderRadius: 2,
          boxShadow: 3,
          ml: 9,
          mb: 2,
          border: "1px solid #e0e0e0",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          width: "90%",
          borderRadius: 2,
          boxShadow: 3,
          ml: 9,
          mb: 2,
          border: "1px solid #e0e0e0",
        }}
      >
        <Typography variant="h6">Error fetching clients</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "90%",
        borderRadius: 2,
        boxShadow: 3,
        ml: 9,
        mb: 2,
        border: "1px solid #e0e0e0",
      }}
    >
      <HeaderContainer>
        <Typography variant="h6">Clients Hired</Typography>
      </HeaderContainer>
      <Divider sx={{ mt: 2 }} />
      <Stack spacing={2} sx={{ m: 2 }}>
        <TableContainer
          sx={{
            mx: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  mb: 2,
                }}
              >
                <TableCell>
                  <b>Client Name</b>
                </TableCell>
                <TableCell>
                  <b>Closure Date</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients &&
                clients.map((client) => (
                  <>
                    <TableRow key={client.id}>
                      <TableCell>
                        <Link to={`/client/${client.id}`}>
                          <b>
                            {client.first_name} {client.last_name}
                          </b>
                        </Link>
                      </TableCell>
                      <TableCell>
                        {client.closure_date
                          ? new Date(client.closure_date).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            // change the job_lead_placement value to null and remove the client from the list
                            
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    <Divider sx={{ my: 2 }} />
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}

EditJobLeadLinkagesComponent.propTypes = {
  jobLead: JobLeadType.isRequired,
};

export default EditJobLeadLinkagesComponent;
