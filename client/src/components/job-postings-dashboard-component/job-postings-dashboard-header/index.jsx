// eslint-disable-next-line no-unused-vars
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { HeaderContainer } from "../index.styles";

function JobPostingsDashboardHeaderComponent() {
  return (
    <HeaderContainer>
      <div>
        <Typography
          sx={{
            justifySelf: "start",
            alignSelf: "start",
            fontWeight: "bold",
            padding: "6% 0 0 0",
            marginLeft: "40px",
          }}
          variant="h3"
        >
          All Job Postings
        </Typography>
      </div>

      <Box sx={{ marginLeft: "auto", display: "flex" }} />
    </HeaderContainer>
  );
}

export default JobPostingsDashboardHeaderComponent;
