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
          style={{
            fontFamily: "Arial",
            fontSize: "34px",
            fontWeight: "Bold",
            lineHeight: "42px",
            letterSpacing: "0.25px",
            textAlign: "left",
            marginRight: 40,
            marginLeft: 40,
          }}
        >
          All Job Postings
        </Typography>
      </div>

      <Box sx={{ marginLeft: "auto", display: "flex" }} />
    </HeaderContainer>
  );
}

export default JobPostingsDashboardHeaderComponent;
