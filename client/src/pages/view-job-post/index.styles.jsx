import { Box } from "@mui/material";

import styled from "styled-components";

const MainContainer = styled.div`
  width: 100%; 
  margin-top: 2rem;
  justify-content: center;
`;

const Divider = styled(Box)`
  border-bottom: 1px solid #0000001f;
  border-color: divider;
  margin-bottom: 10px;
`;

export { Divider, MainContainer };
