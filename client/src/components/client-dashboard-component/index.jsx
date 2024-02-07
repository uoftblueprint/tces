import { Button, Box, Typography, IconButton } from '@mui/material';
import { useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import FilterCard from './client-dashboard-filter/FilterCard';
import ClientTable from './client-dashboard-table/ClientTable';
import ClientDashboardContainer from './index.styles';

function ClientDashboardComponent({ clientData }) {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  // eslint-disable-next-line
  const [rowCount, setRowCount] = useState(clientData.length);

  const displayedRows = clientData.slice(
    paginationModel.page * paginationModel.pageSize,
    (paginationModel.page + 1) * paginationModel.pageSize
  );

  return (
    <ClientDashboardContainer>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px',
            mt: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" sx={{ ml: 1 }}>
              Clients
            </Typography>
          </Box>
          <Box>
            <Button
              sx={{
                marginLeft: 'auto',
                marginBottom: '30px',
                marginRight: '30px',
                marginTop: '30px',
                backgroundColor: 'white',
                border: '1px solid #3568E5',
                color: '#3568E5',
                '&:hover': {
                  backgroundColor: '#3568E5',
                  color: 'white',
                },
              }}
              startIcon={<DownloadIcon />}
              onClick={() => {}}
            >
              EXPORT CURRENT FILTER VIEW ({clientData.length} Clients)
            </Button>
            <Button
              sx={{
                marginLeft: 'auto',
                marginBottom: '30px',
                marginTop: '30px',
                backgroundColor: '#3568E5',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#3568E5',
                  color: 'white',
                },
              }}
              startIcon={<AddIcon />}
              onClick={() => {}}
            >
              ADD NEW CLIENT
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gridColumnGap: '30px',
            width: '100%',
          }}
        >
          <FilterCard />
          <ClientTable
            clientData={displayedRows}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            totalRowCount={rowCount}
          />
        </Box>
      </Box>
    </ClientDashboardContainer>
  );
}

ClientDashboardComponent.propTypes = {
  // eslint-disable-next-line
  clientData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ClientDashboardComponent;
