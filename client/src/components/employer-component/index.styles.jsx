import { Box } from "@mui/material";

import styled from "styled-components";

const EmployerContainer = styled.div`
  margin-right: 2rem;
  margin-left: 2rem;
  width: 100%;
`;
const MainContainer = styled.div`
  width: 100%;
`;

const Divider = styled(Box)`
  border-bottom: 2px solid #0000001f;
  border-color: divider;
  margin-bottom: 10px;
`;

const BoxDivider = styled(Box)`
  border-bottom: 1px solid #0000001f;
  border-color: divider;
  margin-bottom: 10px;
`;

export { EmployerContainer, MainContainer, Divider, BoxDivider };
