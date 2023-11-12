import styled from "styled-components";
import { Box } from "@mui/material";

const JobUpdatesContainer = styled(Box)`
  height: 40vh;
  min-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
`;

const UpdateDivider = styled(Box)`
  border-bottom: 1px solid #0000001f;
  border-color: divider;
  margin-bottom: 10px;
`;

export { JobUpdatesContainer, UpdateDivider };
