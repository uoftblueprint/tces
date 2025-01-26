// .MuiTableRow-root {
//     border-top: 1px solid;
//     border-image: linear-gradient(to right, #000 50%, transparent 50%) 100% 1;
//     position: relative;
// }

// /* .MuiTableRow-root:after {
//   content: '';
//   width: 60px;
//   height: 4px;
//   background: gray;
//   position: absolute;
//   bottom: -4px;
// } */

import { Box } from "@mui/material";

import styled from "styled-components";

const JobApplicationContainer = styled.div`
  margin-right: 2rem;
  margin-left: 2rem;
  width: 100%;
`;
const MainContainer = styled.div`
  width: 100%;
`;

const Divider = styled(Box)`
  border-bottom: 1px solid #0000001f;
  border-color: divider;
  margin-bottom: 10px;
`;

const BoxDivider = styled(Box)`
  border-bottom: 1px solid #0000001f;
  border-color: divider;
  margin-bottom: 10px;
`;

export { JobApplicationContainer, MainContainer, Divider, BoxDivider };
