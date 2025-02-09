import { TableCell } from "@mui/material";

import styled from "styled-components";

const ContentTableCell = styled(TableCell)`
  white-space: normal;
  word-break: break-word;
  text-align: left;
`;

const HeaderTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop === "sx",
})`
  font-weight: 700;
  white-space: normal;
  word-break: break-word;
  text-align: left;
`;

export { ContentTableCell, HeaderTableCell };
