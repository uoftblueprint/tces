import styled from "styled-components";

import { Box, Button } from "@mui/material";

const Form = styled.form`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Helvetica;
  background-color: #f0f3f8;
  text-align: initial;
`;

const Header = styled(Box)`
  margin-top: 40px;
  display: flex;
  width: 47.5rem;
  padding-right: 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;

const Cancel = styled(Button)`
  margin-right: auto !important;
`;

export { Form, Header, Cancel };
