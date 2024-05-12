import { useEffect, useState, useCallback } from "react";
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
import { getFilteredClients, unlinkClient } from "../../../utils/api";
import JobLeadType from "../../../prop-types/JobLeadType";
import { formatDateStr } from "../../../utils/date";
import ConfirmDialog from "../../shared/confirm-dialog-component";

function EditJobLeadLinkagesComponent({ jobLead }) {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [confirmEditDialog, setConfirmEditDialog] = useState(false);
  const [clientToRemove, setClientToRemove] = useState(null);

  const fetchClients = useCallback(async () => {
    const queryParams = new URLSearchParams();
    queryParams.append("job_lead_placement", jobLead.id);
    try {
      setIsLoading(true);
      const response = await getFilteredClients(queryParams.toString());
      if (response.ok) {
        const clientsData = await response.json();
        const formattedClients = clientsData.data.rows.map((client) => ({
          clientID: client.id,
          name: client.name,
          dateClosed: formatDateStr(client.closure_date),
          jobLeadPlacement: client.job_lead_placement,
        }));
        setClients(formattedClients);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Fetch failed.");
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [jobLead.id]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const unlinkClientAndJobLead = async (client) => {
    try {
      const response = await unlinkClient(client.clientID);

      if (response.ok) {
        window.location.reload();
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
      setConfirmEditDialog(false);
    }
  };

  const updateClientToRemove = (client) => {
    setClientToRemove(client);
    setConfirmEditDialog(true);
  };

  return (
    <>
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
          {(() => {
            if (isLoading) {
              return <CircularProgress />;
            }
            if (error) {
              return (
                <Typography variant="body1" color="error">
                  {error.message}
                </Typography>
              );
            }
            return (
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
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients &&
                      clients.map((client) => (
                        <TableRow key={client.clientID}>
                          <TableCell>
                            <Link to={`/clients/${client.clientID}`}>
                              {client.name}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {client.closure_date
                              ? new Date(
                                  client.closure_date,
                                ).toLocaleDateString()
                              : "N/A"}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => {
                                // change the job_lead_placement value to null and remove the client from the list
                                updateClientToRemove(client);
                              }}
                            >
                              <DeleteIcon
                                sx={{
                                  color: "#757575",
                                }}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          })()}
        </Stack>
      </Box>
      <ConfirmDialog
        open={confirmEditDialog}
        title="Confirm Removal"
        message="Are you sure you unassign this client from this job lead?"
        onConfirm={async () => {
          try {
            await unlinkClientAndJobLead(clientToRemove);
            setClientToRemove(null);
          } catch (err) {
            setError(err);
          }
        }}
        onCancel={() => setConfirmEditDialog(false)}
      />
    </>
  );
}

EditJobLeadLinkagesComponent.propTypes = {
  jobLead: JobLeadType.isRequired,
};

export default EditJobLeadLinkagesComponent;
