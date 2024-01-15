import { Box } from "@mui/material";

import styled from "styled-components";

const ArrowContainer = styled.div`
  height: 100%;
`;

const EmployerContainer = styled.div`
  margin-right: 40px;
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

export {
  EmployerContainer,
  ArrowContainer,
  MainContainer,
  Divider,
  BoxDivider,
};
