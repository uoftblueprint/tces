import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { Container, DashboardContainer } from "./index.styles";
import EmployerDashboardHeader from "./employer-dashboard-header";
import EmployerDashboardFilter from "./employer-dashboard-filter";
import EmployerDashboardTable from "./employer-dashboard-table";

function EmployerDashboardComponent({ employerData }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedData = employerData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Container>
      <DashboardContainer>
        <EmployerDashboardHeader numEntries={employerData.length} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gridColumnGap: "30px",
            height: "fit-content",
            paddingBottom: "16px",
            width: "100%",
          }}
        >
          <EmployerDashboardFilter />
          <EmployerDashboardTable
            slicedData={slicedData}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={employerData.length}
          />
        </Box>
      </DashboardContainer>
    </Container>
  );
}

EmployerDashboardComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  employerData: PropTypes.array.isRequired,
};

export default EmployerDashboardComponent;
