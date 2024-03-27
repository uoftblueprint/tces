import { TextField, Box } from "@mui/material";

import styled from "styled-components";

// need to do !important to override mui

const MainContainer = styled.div`
  background-color: white;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
  padding: 20px 0px 0px 0px;
  border-radius: 4px 4px 0 0 !important;
  margin-top: 20px;
`;
const SearchFieldContainer = styled.div`
  background-color: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 0 0 4px 4px !important;
  margin-bottom: 0px !important;
`;

const SearchField = styled(TextField)`
  margin: 0 !important;
  & .MuiOutlinedInput-root {
    border-radius: 0 0 4px 4px;

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: rgba(0, 0, 0, 0.16);
      border-right-color: transparent;
      border-left-color: transparent;
      border-bottom-color: transparent;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: rgba(0, 0, 0, 0.16);
    }
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0.16);
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: transparent;
  }
`;
const Divider = styled(Box)`
  border-bottom: 2px solid #0000001f;
  border-color: divider;
  margin-bottom: 10px;
`;

export { MainContainer, SearchFieldContainer, SearchField, Divider };
